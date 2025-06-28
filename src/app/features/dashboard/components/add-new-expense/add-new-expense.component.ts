import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Category } from '../../models/iCategory.model';
import { CalendarModule } from 'primeng/calendar';
import { Observable } from 'rxjs';
import { currencies } from '../../models/iCurrency.model';
import { CurrencyConverterService } from '../../../../shared/services/currency-converter.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-expense',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CommonModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-new-expense.component.html',
  styleUrl: './add-new-expense.component.scss',
})
export class AddNewExpenseComponent implements OnInit {
  addExpenseForm!: FormGroup;
  allCategories!: Category[];
  fileSelectd!: FormDataEntryValue;
  fileLabel = 'Upload image';
  selectedIcon: string = '';
  currencies?: currencies[];
  selectedIconColor: string = '';
  selectedIconBgColor: string = '';
  private exchangeRates: { [key: string]: number } = {
    EGP: 48,
    EUR: 0.93,
    SAR: 3.75,
    GBP: 0.79,
    USD: 1,
  };

  constructor(
    private location: Location,
    private expenseService: ExpenseService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.intiateExpenseForm();
    this.getListOfCategory();
    this.getAllCurrencies();
  }

  intiateExpenseForm() {
    this.addExpenseForm = this.fb.group({
      categoryName: ['Groceries', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      date: ['', Validators.required],
      currency: ['USD', Validators.required],
    });
  }

  get categoryName() {
    return this.addExpenseForm.get('categoryName')!;
  }
  get amount() {
    return this.addExpenseForm.get('amount')!;
  }
  get date() {
    return this.addExpenseForm.get('date')!;
  }
  get currency() {
    return this.addExpenseForm.get('currency')!;
  }

  goBack() {
    this.location.back();
  }

  getListOfCategory() {
    this.expenseService.listOfCategory().subscribe((res) => {
      this.allCategories = res;
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileLabel = file.name;
      const formData = new FormData();
      formData.append('attachment', file);
      formData.forEach((value, key) => {
        this.fileSelectd = value;
      });
    } else {
      this.fileLabel = 'Upload image';
    }
  }

  selectCategoryIcon(
    cateIcon: string,
    cateIconColor: string,
    cateBgColor: string
  ) {
    this.selectedIcon = cateIcon;
    this.selectedIconColor = cateIconColor;
    console.log(this.selectedIconColor);
    this.selectedIconBgColor = cateBgColor;
  }

  isSelected(icon: string): boolean {
    return this.selectedIcon === icon;
  }

  saveNewExpense() {
    if (this.addExpenseForm.invalid) return;
    this.transformCurrencyToUsd(
      this.addExpenseForm.controls['amount'].value,
      this.addExpenseForm.controls['currency'].value
    );

    const modal = {
      ...this.addExpenseForm.value,
      attachment: this.fileSelectd,
      categoryIcon: this.selectedIcon,
      categoryIconColor: this.selectedIconColor,
      categoryIconBgColor: this.selectedIconBgColor,
    };

    this.expenseService.addNewExpense(modal).subscribe((res) => {
      this.toaster.success('Expense Added Successfully');
      this.addExpenseForm.reset();
      this.router.navigate(['/dashboard']);
    });
  }

  transformCurrencyToUsd(amount: number, fromCurrency: string) {
    const rate = this.exchangeRates[fromCurrency.toUpperCase()];
    const result = amount * rate;

    this.addExpenseForm.controls['amount'].setValue(result);
  }

  getAllCurrencies() {
    this.expenseService.getCurrencies().subscribe((res) => {
      this.currencies = res;
    });
  }
}
