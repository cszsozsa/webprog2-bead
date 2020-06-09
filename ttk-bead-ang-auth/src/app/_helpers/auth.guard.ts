import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        // segedvaltozo, celja: be van-e lepve a felhasznalo
        const user = this.authenticationService.userValue;
        if(user) {
            return true;
        }

        // ha nincs belepve a felhasznalo -> loginra iranyitas
        this.router.navigate(['login']);
        return false;
    }
}