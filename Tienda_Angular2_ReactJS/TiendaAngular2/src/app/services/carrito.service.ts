import { Injectable } from '@angular/core'; 
//======================Importar Modelos========================================
import { ProductoCarrito } from '../models/ProductoCarrito';
//==============================================================================
@Injectable()
export class CarritoService {
  public listaCarrito : ProductoCarrito[] = []; //Crear un arreglo de productos para almacenar los productos guardados en el carrito
  private totales : number[];
  constructor() {
      this.totales = [];
   }
//============Verificar items en el carrito=====================================
  itemsCarrito(){
    if(sessionStorage.getItem("Carrito")){
      this.listaCarrito = JSON.parse(sessionStorage.getItem("Carrito"));
      return JSON.parse(sessionStorage.getItem("Carrito"));
    }
    console.log("Tu carrito está vacio");
  }
//============Contador de items en menu=========================================
  contadorCarrito(){
    return this.itemsCarrito().length
  }
//============Vaciar los items del carrito======================================
  vaciarCarrito(){
    sessionStorage.removeItem('Carrito');
  }
//===Verificar existencia en el carrito para evitar items duplicados============
  verificarCarrito(item){
    if(this.guardarCarrito(item) == false){
      this.listaCarrito.push(item)
    }
    sessionStorage.setItem("Carrito", JSON.stringify(this.listaCarrito));
  }
//=============Guardar Items en el carrito======================================
  guardarCarrito(item){
    if(this.listaCarrito.length > 0){
      for(let itemGuardado of this.listaCarrito){
        if(itemGuardado.id == item.id){
          itemGuardado.disponible = Number(itemGuardado.disponible) + Number(item.disponible)
          return true
        }
      }
      return false;
    }
    return false
  }
//=============Calcular Sub Totales=============================================
  subtotal(precio, cantidad){
    let subtotal = Number(cantidad) * Number(precio);
    this.totales.push(subtotal)
    return subtotal
  }
//=============Eliminar Carrito=============================================
  eliminarCarrito(listaCarrito){
    sessionStorage.setItem("Carrito", JSON.stringify(listaCarrito))
  }
}
