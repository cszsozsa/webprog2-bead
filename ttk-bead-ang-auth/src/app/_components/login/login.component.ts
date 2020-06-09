import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loadingAnimation = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    // ha bevagyunk lepve atiranyit a fooldalra
    if(this.authenticationService.userValue){
      this.router.navigate(['/'])
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //get form
  get f() { return this.loginForm.controls }

  onSubmit() {
     this.submitted = true;

     this.loadingAnimation = true;
     this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(first())
     .subscribe(
       data => {
        this.router.navigate(['/']);
       },
       failure => {
         this.error = failure;
         this.loadingAnimation = false;
       }
     )
  }

}
