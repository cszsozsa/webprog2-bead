import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
// import { first } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[];

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    // Ha nincs belepett felhasznalo, atiranyitas
    if(!this.authenticationService.userValue){
      this.router.navigate(['/login']);
    }
   }

  ngOnInit() {
    this.userService.getAll().subscribe( data => {
      // users tömb tartalmazza a visszakapott értékeket
      console.log("A visszakapott adat: " + data);
      this.users = data;
    })
  }

}
