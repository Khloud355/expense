import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesDashbordComponent } from './components/expenses-dashbord/expenses-dashbord.component';
import { AddNewExpenseComponent } from './components/add-new-expense/add-new-expense.component';
import { ShowAllExpensesComponent } from './components/show-all-expenses/show-all-expenses.component';

const routes: Routes = [
  { path: '', component: ExpensesDashbordComponent },
  {
    path: 'add-expense',
    component: AddNewExpenseComponent,
  },
  {
    path: 'show-all',
    component: ShowAllExpensesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
