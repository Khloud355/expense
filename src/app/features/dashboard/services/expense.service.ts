import { environment } from './../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/iCategory.model';
import { Expense } from '../models/iExpense.model';
import { currencies } from '../models/iCurrency.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}
  getListOfExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(environment.apiUrl + '/expenses');
  }

  listOfCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiUrl + '/categories');
  }

  addNewExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(environment.apiUrl + '/expenses', expense);
  }

  getCurrencies(): Observable<currencies[]> {
    return this.http.get<currencies[]>(environment.apiUrl + '/currencies');
  }

  getIncome() {
    return this.http.get(environment.apiUrl + '/income');
  }
}
