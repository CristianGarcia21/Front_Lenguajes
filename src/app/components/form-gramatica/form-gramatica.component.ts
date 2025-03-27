import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Produccion {
  value: string;
}

@Component({
  selector: 'app-form-gramatica',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-gramatica.component.html',
  styleUrl: './form-gramatica.component.css'
})
export class FormGramaticaComponent {
  producciones: Produccion[] = [{ value: '' }]; 

  agregarProduccion(): void {
    this.producciones.push({ value: '' }); 
  }

  quitarProduccion(index: number): void {
    if (index > 0) { 
      this.producciones.splice(index, 1);
    }
  }

  enviar(): void {
    
    const simboloInicial = (document.getElementById('initialSymbol') as HTMLInputElement).value;
    console.log('Símbolo inicial:', simboloInicial);
  
    console.log('Producciones:');
    this.producciones.forEach((produccion, index) => {
      console.log(`Producción ${index + 1}:`, produccion.value);
    });

    const formData = {
      simboloInicial: simboloInicial,
      producciones: this.producciones.map(p => p.value)
    };
    console.log('Datos completos del formulario:', formData);
  }
}