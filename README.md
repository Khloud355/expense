# ExpenseTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
#############################################################

i workd in this project with angular version 17 
i used libraries like  "@fortawesome/fontawesome-free": "^6.7.2",
    "bootstrap": "^5.3.7",
    "ngx-toastr": "^19.0.0",
    "primeflex": "^4.0.0",
    "primeicons": "^6.0.1",
    "primeng": "^17.18.15",
        "tailwindcss": "^3.4.17",
i used tailwind library to handle design and uses classes to handle css without using scss files
    
    ///architecture and structure
    i divided src to some folders and modules
    core (Contains singleton services and app-level functionality that should be loaded only once throughout the application.)
    feature (Each main feature in your app should be in its own module under this folder like expense dashboard module feature)
    shared (For reusable components, pipes, directives, or modules used across multiple features like expense card)
    auth (Handles authentication logic like login, register, password reset )
    each folder or module divided into components folder ,services folder, models folder and pipe or directive if needed
    
    i see your design and i tried to simulate it but I faced difficulties to take orignal image, icons,fonts and background so i tried to  find similar  to them. take icons form fortawesome or lucide As you nominated me

  ///  implemented API integration

  i used json server to can deal with apis i installed json server and make folder fake-apis( (expense.json)) and put in it all data i used in project so i have 5 apis like... 
  1-categories (to get all categories)
  2-expenses (to get all expenses i entered)
  3-currencies (to get all currencies)
  4-users (to make authentcation)
  5-income (to get income of user to can i calculate total balance and expenses)

///​Pagination strategy (local vs. API)
i make pagination strategy local just needed api to get all expenses and (Expense list should be paginated (10 items per page))
i used this function to get pagination
  get paginatedExpenses() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.listOfExpenses.slice(start, start + this.itemsPerPage);
  } 
  i  depended on list and itemsPerPage ==10 and currecntPage =1
  
  and use loadmoreitems function to get next expense after 10 items
    loadMoreItems() {
    this.currentPage++;
  }
  
to check have items or not
  hasMoreItems(): boolean {
    return this.currentPage * this.itemsPerPage < this.listOfExpenses.length;
  }
  make loadmore button to give me next expenses
  and previous button to go back to prevouis expenese
  prevouis will appear in next expenes


  ////UI screenshots
i will put it in mail 

//// 
i worked on login page and make design and can login with using email and password 
email: khloud Rammah
password: 123456
or email🏸admin
password:admin
don't forget to run json server( json-server --watch expense.json)


when made login, it will check api and give my success and will appear toaster and go to dashboard 
i made dashboard have username that i saved  in local storage when login successfully and  dropdown list have (this month ,last7 days, last15days)
 by default  dashboard will be filterd by this month so if you enter expense in last month didn't appear in dashboard (will appear in see all)
  i calculate expnses By calculating all the expenses that I spent during this month 

  i used this function 
    filterExpenses(range: 'month' | '7days' | '15days') {
    this.listOfExpenses = this.filterExpensesByRange(this.allExpenses, range);

    this.totalExpenses = this.listOfExpenses.reduce(
      (sum, exp) => sum + Number(exp.amount),
      0
    );
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
  
  to filteration and calcualte expense
  and made api to get income to can calculate total balance 
  
  and when add new expense i will add amount and currency and when save expense i will converted value from any currency to USD BY USING THIS function
  
    transformCurrencyToUsd(amount: number, fromCurrency: string) {
    const rate = this.exchangeRates[fromCurrency.toUpperCase()];
    const result = amount * rate;

    this.addExpenseForm.controls['amount'].setValue(result);
  }
  i not use any api in this feature so i used    private exchangeRates: { [key: string]: number } = {
    EGP: 48,
    EUR: 0.93,
    SAR: 3.75,
    GBP: 0.79,
    USD: 1,
  };
 finally ...( i implemented all feature that u noted me in task and i have't no bugs) i made desktop application and responsive
 but responsive hane some issue but notcare
