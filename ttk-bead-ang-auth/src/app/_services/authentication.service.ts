import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
   }

  // Belepett felhasznalo lekerdezese
  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map( user => {
        // A felhasznalo adatait eltarolni a local storage-ban, hogy oldalfrissiteskor ne leptessen ki
        user.authdata = window.btoa(username + ':' + password);
        // A belepett felhasznalo eltarolasa a localStorage-ban
        localStorage.setItem('user', JSON.stringify(user));
        // userSubject ertesitse a feliratkozott metodusokat a belepett felhasznalorol
        this.userSubject.next(user);
        return user;
      }));
  }

  logout(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
