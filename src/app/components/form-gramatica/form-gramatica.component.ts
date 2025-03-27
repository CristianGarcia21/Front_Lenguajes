import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface Produccion {
  value: string;
}



export interface RespuestaBackend {
  lenguaje?: string[];
  error?: string;
  mensaje?: string;
  // Agrega aquí otras propiedades que pueda devolver tu backend
}

@Component({
  selector: 'app-form-gramatica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-gramatica.component.html',
  styleUrl: './form-gramatica.component.css'
})
export class FormGramaticaComponent {
  simboloInicial: string = ''; 
  producciones: Produccion[] = [{ value: '' }]; 
  mostrarResultado: boolean = false;
  resultadoSimboloInicial: string = '';
  resultadoProducciones: string[] = [];
  isLoading: boolean = false;
  error: string = '';
  respuestaBackend?: RespuestaBackend; // Para almacenar la respuesta que devuelve el backend

  constructor(private apiService: ApiService) {}

  agregarProduccion(): void {
    this.producciones.push({ value: '' }); 
  }

  quitarProduccion(index: number): void {
    if (index > 0) { 
      this.producciones.splice(index, 1);
    }
  }

  cerrarResultado(): void {
    this.mostrarResultado = false;
  }

  enviar(): void {
    console.log('Símbolo inicial:', this.simboloInicial);
    
    console.log('Producciones:');
    this.producciones.forEach((produccion, index) => {
      console.log(`Producción ${index + 1}:`, produccion.value);
    });
  
    // Verificar si hay campos vacíos
    if (!this.simboloInicial.trim()) {
      this.error = 'Debe ingresar un símbolo inicial';
      return;
    }

    if (this.producciones.some(p => !p.value.trim())) {
      this.error = 'Todas las producciones deben contener un valor';
      return;
    }

    // Transformar el formato de los datos
    const produccionesObj: Record<string, string[]> = {};
    
    // Añadir la primera producción correspondiente al símbolo inicial
    if (this.producciones.length > 0) {
      produccionesObj[this.simboloInicial] = [this.producciones[0].value];
    }
    
    // Para el resto de producciones, extraer el no terminal y la regla
    for (let i = 1; i < this.producciones.length; i++) {
      const produccion = this.producciones[i].value;
      
      
      const match = produccion.match(/^([A-Z])\s*(?:->|:)?\s*(.*)/);
      
      if (match && match.length >= 3) {
        const noTerminal = match[1];
        const regla = match[2].trim();
        
        if (!produccionesObj[noTerminal]) {
          produccionesObj[noTerminal] = [];
        }
        
        produccionesObj[noTerminal].push(regla);
      } else {
        // Si no encuentra el formato esperado, muestra un error
        this.error = `Formato incorrecto en la producción ${i+1}: ${produccion}`;
        return;
      }
    }
  
    const formData = {
      simboloInicial: this.simboloInicial,
      producciones: produccionesObj
    };
    
    console.log('Datos formateados para el backend:', formData);
  
    this.isLoading = true;
    this.error = '';
    this.respuestaBackend = undefined; 
  
    this.apiService.enviarGramatica(formData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        
        // Guardar la respuesta completa
        this.respuestaBackend = response;
        
        // Guardar los datos originales enviados para mostrarlos
        this.resultadoSimboloInicial = this.simboloInicial;
        this.resultadoProducciones = this.producciones.map(p => p.value);
        
        // Mostrar el resultado y ocultar spinner
        this.mostrarResultado = true;
        this.isLoading = false;
        
        this.simboloInicial = '';
        this.producciones = [{ value: '' }];
      },
      error: (error) => {
        console.error('Error al enviar datos:', error);
        this.error = 'Ocurrió un error al comunicarse con el servidor.';
        this.isLoading = false;
        
        // Si el error tiene un mensaje específico del backend, mostrarlo
        if (error.error && error.error.mensaje) {
          this.error = error.error.mensaje;
        }
      }
    });
  }
}