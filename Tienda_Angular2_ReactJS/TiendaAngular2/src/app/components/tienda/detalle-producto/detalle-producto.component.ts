import { Component, OnInit } from '@angular/core'; 
import { Router, ActivatedRoute} from '@angular/router'; //Inyectar el componente router para manejar redirecciones URL

//======================Importar Componentes====================================
import { AuthService } from "../../../services/auth.service";
import { ProductoService} from '../../../services/producto.service';
import { BarraSuperiorComponent  } from '../../barra-superior/barra-superior.component';
import { Producto } from '../../../models/Producto';


@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  informacionProducto : Producto;

  constructor(private productoService : ProductoService,
    private router : Router,
    private auth : AuthService,
    private activatedRoute : ActivatedRoute) { }

    ngOnInit() {
      if (!this.auth.checkSession()){
        console.log(sessionStorage.getItem("Session"))
        this.router.navigate(['/login'])
      }else{
        this.detalleProducto()
      }
    }

    detalleProducto(){
      this.activatedRoute.params.subscribe(params => {
        this.productoService.getProductos().subscribe(
          () => {
            this.informacionProducto = this.productoService.getDetalleProductos(params['id']);
          })
        });
      }
    }
