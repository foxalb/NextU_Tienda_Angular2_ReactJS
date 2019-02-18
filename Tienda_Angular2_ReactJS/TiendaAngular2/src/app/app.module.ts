import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Inyectar los componentes de formularios
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2'; //Inyectar los componentes de angularfire2

/*Services*/
import { AuthService} from "./services/auth.service";
import { DatabaseService } from './services/database.service'; //Incluir el servicio DatabaseServices
import { TiendaDatabaseService } from './services/tienda-database.service'; //Incluir el servicio TiendaDatabaseServices

/*Components*/
import { AppComponent } from './app.component';
import { TiendaRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { ListaProductosComponent } from './components/tienda/lista-productos/lista-productos.component';
import { ComponentsComponent } from './components/components.component';
import { CarritoComponent } from './components/carrito/carrito.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAIEmj4GhV5uj1iI9yM30DTQgXabiezy5w",
  authDomain: "tienda-angular2.firebaseapp.com",
  databaseURL: "https://tienda-angular2.firebaseio.com",
  projectId: "tienda-angular2",
  storageBucket: "tienda-angular2.appspot.com",
  messagingSenderId: "529996794003"
}; 

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    LoginComponent,
    TiendaComponent,
    ListaProductosComponent,
    ComponentsComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule, //Inyectar el módulo ReactiveForms
    TiendaRoutingModule //Agregar el modulo TareasRouting para el manejo de las URL
  ],
  providers: [AuthService,TiendaDatabaseService, DatabaseService], //Inyectar los servicios TiendaDatabaseService y DatabaseService dentro de la aplicacion
  bootstrap: [AppComponent]
})
export class AppModule { }
