import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AUTHpelda';
  loggedInUser: User;

  constructor(
    private aS: AuthenticationService
  ) {
    this.aS.user.subscribe(user => this.loggedInUser = user)
  }

  logout(){
    this.aS.logout();
  }
}
