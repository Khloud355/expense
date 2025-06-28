import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentcationService } from '../../services/authentcation.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userDataForm!: FormGroup;
  isShowPassword: boolean = false;

  constructor(
    private router: Router,
    private authentcationService: AuthentcationService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.intaiteUserForm();
  }

  intaiteUserForm() {
    this.userDataForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submit() {
    this.authentcationService
      .login(this.userDataForm.value)
      .subscribe((res) => {
        if (res.success) {
          this.toaster.success(res.message);
          // save data in local storageeee
          localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigate(['/dashboard']);
        } else {
          this.toaster.error(res.message);
        }
      });
  }
}
