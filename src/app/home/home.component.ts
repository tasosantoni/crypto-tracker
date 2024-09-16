import { Component } from '@angular/core';
import { inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  authService = inject(AuthService);
  router = inject(Router);
  username = this.authService.getAuthUserName();

  reloadPage(){

    window.location.reload();

  }

  logout(){

    this.authService.logout();
    this.router.navigate(['/login']);

  }

}
