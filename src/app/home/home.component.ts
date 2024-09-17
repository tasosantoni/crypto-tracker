import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CoinApiService} from '../service/coin-api.service'
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup,  } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  authService = inject(AuthService);
  router = inject(Router);
  username = this.authService.getAuthUserName();

  coinService = inject(CoinApiService);
  searchName: any;
  dataSource!: any;
  displayedColumns = [
    "symbol",
    "name",
    "change",
    "price",
    "marketCap",
    "rank"
  ]

  private fb = inject(FormBuilder);
  coinSearchForm! : FormGroup;


  ngOnInit(){
    this.dataSource = this.getTopCoins();

    this.coinSearchForm = this.fb.group({
      searchName: [""]
    })
  }

  reloadPage(){

    window.location.reload();

  }

  logout(){

    this.authService.logout();
    this.router.navigate(['/login']);

  }

  getTopCoins(){
    this.coinService.getTopCoins().subscribe((res) => {
      console.log(res.data.coins);
      this.dataSource = new MatTableDataSource(res.data.coins);
    })

  }

  searchCoin(){
    this.coinService.searchCoin(this.coinSearchForm.get(['searchName'])!.value).subscribe((res) => {
      console.log(res.data.coins);
      this.dataSource = new MatTableDataSource(res.data.coins);
  })
  
  }

}
