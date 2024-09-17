import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinApiService {

  private apiKey='f50f2c5a6fmsh0675b1b01161385p16dc38jsn99b3dfc1fbe5';
  private apiUrl='https://api.coinranking.com/v2/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=100';

  constructor(private http: HttpClient) { }

  getTopCoins():Observable<any>{

    const headers = new HttpHeaders()
     .set("x-rapidapi-key",this.apiKey)
     .set("x-rapidapi-host","coinranking1.p.rapidapi.com")

     const option={headers};

     return this.http.get(this.apiUrl,option)

  }

  searchCoin(coinName:string):Observable<any>{
    const headers = new HttpHeaders()
     .set("x-rapidapi-key",this.apiKey)
     .set("x-rapidapi-host","weatherapi-com.p.rapidapi.com")

     const option={headers};

     return this.http.get(`https://api.coinranking.com/v2/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&orderBy=marketCap&search=${coinName}&orderDirection=desc&limit=50`,option)
  }
}
