import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] | any;
ngOnInit() {
this.items = [
{
items: [
{
label: 'Ingresar',
icon: 'pi pi-sign-in',
routerLink:'/login',
},
{
label: 'Registrar',
icon: 'pi pi-user-plus',
routerLink:'/register'
},
],
},
];
}

}
