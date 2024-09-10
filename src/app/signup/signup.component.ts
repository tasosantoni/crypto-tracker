import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatToolbarModule, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  authService  =  inject(AuthService);
  router  =  inject(Router);

  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit() {
    if(localStorage.getItem('authUser')){
        this.router.navigate(['/home']);
        return;
    }
  }

  public onSubmit() {
    if (this.signupForm.valid) {

      console.log(this.signupForm.value);

      this.authService.signup(this.signupForm.value);
      
      this.router.navigate(['/login']);
    }
  }

  reloadPage(){

    window.location.reload();

  }

}
