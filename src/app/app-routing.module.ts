import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ProductoListaComponent } from './componentes/producto-lista/producto-lista.component';
import { HomeComponent } from './componentes/home/home.component';
import { authGuard } from './guardias/auth.guard';
import { ProductosComponent } from './componentes/productos/productos.component';


const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate:[authGuard]},
  {path:'productos', component: ProductosComponent},
  {path: '', component: ProductoListaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
