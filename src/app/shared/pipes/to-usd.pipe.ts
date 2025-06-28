import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUsd',
  standalone: true,
})
export class ToUsdPipe implements PipeTransform {
  private exchangeRates: { [key: string]: number } = {
    EGP: 48,
    EUR: 0.93,
    SAR: 3.75,
    GBP: 0.79,
    USD: 1,
  };
  transform(amount: number, fromCurrency: string): string {
    const rate = this.exchangeRates[fromCurrency.toUpperCase()];
    if (!rate) {
      return 'Unsupported currency';
    }

    const result = amount * rate;
    return `$${result.toFixed(2)}`;
  }
}
