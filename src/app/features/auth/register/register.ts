import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm  = control.get('password_confirmation')?.value;
  return password === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  form: FormGroup;
  loading = false;
  error = '';
  selectedRole = 'client';
  showPassword = false;
  showConfirm  = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name:                  ['', [Validators.required]],
      email:                 ['', [Validators.required, Validators.email]],
      phone:                 [''],
      city:                  [''],
      password:              ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
      role:                  ['client'],
    }, { validators: passwordMatchValidator });
  }

  setRole(role: string): void {
    this.selectedRole = role;
    this.form.patchValue({ role });
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
  toggleConfirm():  void { this.showConfirm  = !this.showConfirm;  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    this.auth.register(this.form.value).subscribe({
      next: (res) => {
        const role = res.user.role;
        if (role === 'provider') this.router.navigate(['/provider/dashboard']);
        else                     this.router.navigate(['/client/home']);
      },
      error: (err) => {
        this.error = err.error?.message ?? 'Erreur lors de l\'inscription';
        this.loading = false;
      }
    });
  }
}