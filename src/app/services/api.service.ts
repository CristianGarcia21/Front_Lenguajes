import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GramaticaData {
  simboloInicial: string;
  producciones: Record<string, string[]>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  // Método para enviar datos de gramática al servidor
  enviarGramatica(data: GramaticaData): Observable<any> {
    return this.http.post(`${this.apiUrl}/generar-lenguaje`, data);
  }

 
}
