import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       //add header with basic auth credentials if user is logged in and request is to the api url
       const user = this.authenticationService.userValue;
       const isLoggedIn = user && user.authdata;
       // keres a localhost:4200-rol erkezik
       const isApiUrl = request.url.startsWith(environment.apiUrl);
       if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Basic ${user.authdata}`
            }
        });
    }

        return next.handle(request);
    }
}