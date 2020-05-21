import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  urlIdProducto: string;

  constructor( private httpClient: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

      return new Promise( ( resolve) => {
        // Leer  informacion productos
        this.httpClient.get('https://angular-html-3eeb0.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[])  => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
      });

  }

  getProducto(id: string){
    this.urlIdProducto = 'https://angular-html-3eeb0.firebaseio.com/productos/' + id + '.json';
    // console.log('url:' + this.urlIdProducto);

    return this.httpClient.get(this.urlIdProducto);
  }

  buscarProducto(termino: string){

    if ( this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // aplicar filtro
        this.filtrarProductos(termino);
      });
    }
    else {
      // aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos( termino: string ) {
    termino = termino.toLocaleLowerCase();
    this.productosFiltrado = [];
    // console.log(this.productos);
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      const categoriaLower = prod.titulo.toLocaleLowerCase();
      if ( categoriaLower.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productosFiltrado.push( prod );
      }
    });
  }

}
