import { Component, input, OnInit } from '@angular/core';
import { Expense } from '../../../features/dashboard/models/iExpense.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.scss',
})
export class ExpenseItemComponent {
  expenseCardData = input<Expense>(); // instead of @input decorator we use input function to make it a signal and accept any type of value (can give type optional)

  isToday(date: any): boolean {
    const d = new Date(date);
    const today = new Date();

    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  }
}
