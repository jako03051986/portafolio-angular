import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: Item;
  id: string;

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
      // console.log(parametros['id']);
      this.productoService.getProducto(parametros.id)
          .subscribe( (producto: Item) => {
            // console.log(producto);
            this.id = parametros.id;
            this.producto = producto;
          });
    });
  }

}
