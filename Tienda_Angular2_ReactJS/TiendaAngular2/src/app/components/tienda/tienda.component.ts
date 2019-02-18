import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'; //Importar los componentes ForModule, FormControl y Validator para manejar y validar los formularios
import { CurrencyPipe } from '@angular/common'
import { OnChanges } from '@angular/core';
//======================Importar Servicios======================================
import { AuthService } from "../../services/auth.service";
import { CarritoService} from '../../services/carrito.service';
import { TiendaService} from '../../services/tienda.service';
//======================Importar Componentes====================================
//import { BarraSuperiorComponent  } from '../barra-superior/barra-superior.component';
//======================Importar Modelos========================================
//import { Producto } from '../../models/Producto';
import { ProductoCarrito } from '../../models/ProductoCarrito';
//=====================Importar Pipes===========================================


@Component({
  selector: 'tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  private formulario : FormGroup; //Definir la variable formulario como un FormGroup
  private listaProductos : Object[]; //Crear un objeto con la lista de tiendas obtenidos de la base de datos
  public tiendaCarrito : ProductoCarrito; //Definir un objeto con las pro
  private titulo : string;

  constructor(private tiendaService : TiendaService,
              private router : Router,
              private auth : AuthService,
              private carritoService : CarritoService
            ) { this.titulo = 'Catálogo de Productos'}


  ngOnInit() {
    if (!this.auth.checkSession()){
      console.log(sessionStorage.getItem("Session"))
      this.router.navigate(['/login'])
    }else{
      this.formulario = new FormGroup(
        {
          'descripcion' : new FormControl(),
          'imagen': new FormControl(),
          'precio': new FormControl(),
          'disponible': new FormControl(),
        }
      )
      this.mostrarProductos()
    }
  }

//================Cargar Productos==============================================
  mostrarProductos(){
    this.tiendaService.getProductos().subscribe(
      ()=>{
        this.listaProductos = this.tiendaService.catalogo
      }
    )
  }
//================Agregar Productos=============================================
  agregarProducto(id:number, value:number){
    this.tiendaService.buscarProducto(id).subscribe(
      (tiendaEncontrado)=>{
        if(tiendaEncontrado.disponible < value){
          window.alert('Máxima existencia es: '+ tiendaEncontrado.disponible);
        }else{
          this.tiendaCarrito = tiendaEncontrado
          this.tiendaCarrito.disponible = value
          this.carritoService.verificarCarrito(this.tiendaCarrito);
        }
     }
    )
  }
  //================Filtrar Productos=============================================
    filtrarCatalogo(filtro){
    //Vaciar el arreglo de objetos
    this.listaProductos = [];
      this.tiendaService.getProductos().subscribe(
        ()=>{
            for(let item of this.tiendaService.catalogo ){
            //Convertir el arreglo de objetos en cadena de caracteres para verificar
            //si este incluye el texto digitado en el campo de filtros.
              if(JSON.stringify(item).includes(filtro) == true){
                this.listaProductos.push(item); //Agregar el objeto Producto al arreglo de tiendas
              }
            }
            return this.listaProductos;
        }
      )
    }
  //==============================================================================
}
