import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto [] = [];
  cargando = true;
  productoFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {

      this.http.get('https://angular-html-b2fdc.firebaseio.com/productos_idx.json')
        .subscribe ( (resp: Producto[])  => {
          this.productos = resp;
          setTimeout(() => {
            this.cargando = false;
          }, 1000);
          resolve();
        });
    });

  }


  public getProducto( id: string ) {
    return this.http.get(`https://angular-html-b2fdc.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {
    if (this.productos.length === 0 ) {
        this.cargarProductos().then(() => {
          this.filtrarProductos(termino);
        });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productoFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productoFiltrado.push(prod);
      }
    });
  }
}
