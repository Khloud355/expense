import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { ExpenseItemComponent } from '../../../../shared/components/expense-item/expense-item.component';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/iExpense.model';

@Component({
  selector: 'app-show-all-expenses',
  standalone: true,
  imports: [CommonModule, SkeletonModule, ExpenseItemComponent],
  templateUrl: './show-all-expenses.component.html',
  styleUrl: './show-all-expenses.component.scss',
})
export class ShowAllExpensesComponent implements OnInit {
  isLoading: boolean = true;
  listOfExpenses: Expense[] = [];
  constructor(private expenseService: ExpenseService) {}
  ngOnInit(): void {
    this.getAllExpense();
  }
  getAllExpense() {
    this.expenseService.getListOfExpenses().subscribe((res) => {
      this.listOfExpenses = res;

      this.isLoading = false;
    });
  }
}
