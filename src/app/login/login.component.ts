import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatToolbarModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  public loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  })

  ngOnInit() {
    if(localStorage.getItem('authUser')){
        this.router.navigate(['/home']);
        return;
    }
  }

  onSubmit(){
    if(this.loginForm.valid){

      console.log(this.loginForm.value);

      this.authService.login(this.loginForm.value);
        
      if(this.authService.isLoggedIn()){

        this.router.navigate(['/home']);

      }

    }
  }

  reloadPage(){

    window.location.reload();

  }

}
