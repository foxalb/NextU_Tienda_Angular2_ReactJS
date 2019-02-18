import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TiendaComponent} from './components/tienda/tienda.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'tienda', component: TiendaComponent, pathMatch: 'full' },
  { path: 'tienda/detalle-producto/:id', component: TiendaComponent},
  { path: 'carrito', component: TiendaComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [] 
})
export class TiendaRoutingModule { }
