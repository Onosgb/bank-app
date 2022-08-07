import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    accNo: new FormControl(''),
    accBalance: new FormControl(0),
    status: new FormControl('Active'),
    bank: new FormControl('Fidelity'),
  });
  loading = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.registerForm.value.accBalance = 10000;
    const min = 10000000;
    const max = 90000000;
    const random = Math.floor(Math.random() * min) + max;

    if (
      this.registerForm.valid &&
      this.registerForm.value.password ===
        this.registerForm.value.confirmPassword
    ) {
      this.registerForm.value.accNo = `${236}${random}`;
      this.authService
        .createUserWithEmailAndPassword(this.registerForm.value)
        .then((user) => {
          this.loading = false;
        });
    }
  }

  get rf() {
    return this.registerForm.controls;
  }
}
