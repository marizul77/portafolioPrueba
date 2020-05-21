import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  productoDet: ProductoDescripcion;
  productoDetId: string;

  constructor(private activatedRoute: ActivatedRoute,
              public productoService: ProductosService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe( parametros => {
        this.productoService.getProducto(parametros.id)
            .subscribe( (productoDescripcion: ProductoDescripcion) => {
               this.productoDet = productoDescripcion;
               this.productoDetId = parametros.id;
              //  console.log(productoDescripcion);
            });
      });
  }
}

