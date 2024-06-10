import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'; 

export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('email')){
    return true;
  } else {
    const router = inject(Router); // Corregido el nombre del servicio
    router.navigate(['login']);
    return false; // Asegúrate de devolver false cuando la autenticación falla
  }
};
