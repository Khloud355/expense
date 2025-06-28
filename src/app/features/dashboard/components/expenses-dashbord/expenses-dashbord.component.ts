import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ExpenseItemComponent } from '../../../../shared/components/expense-item/expense-item.component';
import { Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/iExpense.model';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { MobileFooterComponent } from '../../../../layout/mobile-layout/mobile-footer/mobile-footer.component';

@Component({
  selector: 'app-expenses-dashbord',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    ExpenseItemComponent,
    CommonModule,
    SkeletonModule,
    RouterModule,
    MobileFooterComponent,
  ],
  templateUrl: './expenses-dashbord.component.html',
  styleUrl: './expenses-dashbord.component.scss',
})
export class ExpensesDashbordComponent implements OnInit {
  options = [
    { name: 'This Month', code: 'month' },
    { name: 'Last 7 Days', code: '7days' },
    { name: 'Last 15 Days', code: '15days' },
  ];

  isLoading: boolean = true;
  listOfExpenses: Expense[] = [];
  userName: string = '';
  allExpenses: Expense[] = [];
  income: any;
  totalBalance: number = 1300;
  itemsPerPage = 10;
  currentPage = 1;
  totalExpenses: number = 0;

  constructor(private router: Router, private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.getAllExpense();
    this.getIncome();
    if (typeof window !== 'undefined' && localStorage) {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        this.userName = user.username;
      } else {
        console.log('No user is logged inmmm');
      }
    }
  }

  addExpense() {
    this.router.navigate(['/dashboard/add-expense']);
  }

  getAllExpense() {
    this.expenseService.getListOfExpenses().subscribe((res) => {
      this.allExpenses = res;
      this.listOfExpenses = res;
      this.filterExpenses('month');
      this.isLoading = false;
    });
  }

  filterExpensesByRange(
    expenses: any[],
    range: 'month' | '7days' | '15days'
  ): any[] {
    const now = new Date();
    let startDate: Date;

    if (range === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      const days = range === '7days' ? 7 : 15;
      startDate = new Date();
      startDate.setDate(now.getDate() - days);
    }

    return expenses.filter((exp) => {
      const expenseDate = new Date(exp.date);
      return expenseDate >= startDate && expenseDate <= now;
    });
  }

  onFilterChange(event: any) {
    const selected = event.value;
    this.filterExpenses(selected.code);
  }

  filterExpenses(range: 'month' | '7days' | '15days') {
    this.listOfExpenses = this.filterExpensesByRange(this.allExpenses, range);

    this.totalExpenses = this.listOfExpenses.reduce(
      (sum, exp) => sum + Number(exp.amount),
      0
    );
  }

  get paginatedExpenses() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.listOfExpenses.slice(start, start + this.itemsPerPage);
  }

  loadMoreItems() {
    this.currentPage++;
  }

  hasMoreItems(): boolean {
    return this.currentPage * this.itemsPerPage < this.listOfExpenses.length;
  }

  backToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  getIncome() {
    this.expenseService.getIncome().subscribe((res) => {
      this.income = res;
    });
  }
}
