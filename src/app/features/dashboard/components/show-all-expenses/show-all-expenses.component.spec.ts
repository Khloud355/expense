import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllExpensesComponent } from './show-all-expenses.component';

describe('ShowAllExpensesComponent', () => {
  let component: ShowAllExpensesComponent;
  let fixture: ComponentFixture<ShowAllExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllExpensesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAllExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
