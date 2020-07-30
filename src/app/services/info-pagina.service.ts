import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any = [];

  constructor( private http: HttpClient) {
    console.log('Servicio listo');
    this.cargarInfo();
    this.cargarEquipo();
   }

   private cargarInfo() {
    // Leer JSON del data-Pagina
    this.http.get('assets/data/data-pagina.json')
    .subscribe ( (resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
      console.log(this.info);
    });

   }

   private cargarEquipo() {

    // Leer JSON del data-Pagina
    this.http.get('https://angular-html-b2fdc.firebaseio.com/equipo.json')
    .subscribe ( (resp: any[]) => {
      this.cargada = true;
      this.equipo = resp;
      // console.log(this.equipo);
    });

   }
}
