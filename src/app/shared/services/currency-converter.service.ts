import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  constructor(private http: HttpClient) {}
  // i tried to work with api but didn't work correctly give me an error i will replace it by making pipe and تثبيت سعر الصرف

  // convert(from: string, to: string, amount: number) {
  //   return this.http.get(
  //     `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
  //   );
  // }
}
