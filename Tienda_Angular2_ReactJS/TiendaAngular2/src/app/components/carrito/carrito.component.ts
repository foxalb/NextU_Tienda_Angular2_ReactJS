import { Component, OnInit } from '@angular/core'; 
import { ChangeDetectorRef } from '@angular/core';
//======================Importar Servicios======================================
import { CarritoService } from '../../services/carrito.service';
//======================Importar Modelos========================================
import { ProductoCarrito } from '../../models/ProductoCarrito';
//import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
//==============================================================================
declare let $: any;

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public listaCarrito : ProductoCarrito[] = []; //Crear un arreglo de productos para almacenar los productos guardados en el carrito
  public titulo: string;


  constructor(private carritoService : CarritoService,
              private detectChanges:ChangeDetectorRef) {
    this.titulo = 'Carrito de compras';
   }

  ngOnInit() {
      this.listaCarrito = this.carritoService.itemsCarrito()
  }

  //==============Calcular Totales================================================
    total(){
      let total :number = 0
      let items = this.carritoService.listaCarrito
      for(let subtotal of items ){
       total += subtotal.disponible * subtotal.precio;
      }
      return total;
    }
  //================Eliminar Productos Carrito==================================
    eliminarProducto(id:number, value:number){
      for(let item of this.listaCarrito){
          if(item.id == id){
            let index = this.listaCarrito.indexOf(item)
            if(value == null){
              this.listaCarrito.splice(index, 1)
              this.carritoService.eliminarCarrito(this.listaCarrito)
              this.total()
            }else{
              if(value > 0){
              item.disponible = (Number(item.disponible) - value) //restarle el valor actual al valor disponible
              this.carritoService.eliminarCarrito(this.listaCarrito) //Eliminar el item de la sesion Carrito
            }else{
            window.alert('Debe especificar una cantidad válida')
          }
          }
        }
      }
      this.detectChanges.detectChanges(); //Actualizar los cambios
    }
  //==============================================================================

  showModal(){
    // Show modal with jquery
    //$(this.modal.nativeElement).modal('show');
  }

}
