import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './componentes/register/register.component';
import { LoginComponent } from './componentes/login/login.component';
import { ProductoListaComponent } from './componentes/producto-lista/producto-lista.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'registrer',component:RegisterComponent},
  {path:'',component:ProductoListaComponent}
];

//Holaaaaaa
// momento seriooooooooooooo

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
