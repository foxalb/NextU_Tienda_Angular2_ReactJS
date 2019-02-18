import { Injectable } from '@angular/core'; 
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'; //Inyectar el componente router para manejar redirecciones URL
import { Producto } from '../models/Producto'
import 'rxjs/Rx';

@Injectable()
export class TiendaService {

  constructor(private http : Http, private router : Router) { }
  public catalogo : Producto[];
  public productoCatalogo : Producto;

  public getProductos(){
    return this.http.get('https://tienda-angular2.firebaseio.com/productos/.json')
    .map((response : Response) => {
        this.catalogo =  response.json()
      }
    )
  }

  public getDetalleProductos(idProduct:number){
    for(let item of this.catalogo){
      if(item.id == idProduct){
        return item;
      }
    }
  }

  public buscarProducto(id){
    return this.http.get(`https://tienda-angular2.firebaseio.com/productos/${id}.json`)
    .map((response : Response) => {
        return this.productoCatalogo =  response.json()
      }
    )
  }

  public filtrarProducto(filtro){
    return this.http.get(`https://tienda-angular2.firebaseio.com/productos/.json`)
    .map((response : Response) => {
        return this.productoCatalogo =  response.json()
      }
    )
  }


}
