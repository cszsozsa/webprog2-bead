import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'register.component.html', styleUrls: ['register.component.css'] })

export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    // ha bevagyunk lepve atiranyit a fooldalra
    if(this.authService.userValue){
      this.router.navigate(['/'])
    }
  }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }
      this.loading = true;
      this.authService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['../login']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    }

    goBack() {
        this.location.back();
    }
} 