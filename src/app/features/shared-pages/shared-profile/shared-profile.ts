import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-shared-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shared-profile.html',
  styleUrl: './shared-profile.css'
})
export class SharedProfile implements OnInit {

  form: FormGroup;
  loading = false;
  success = '';
  error = '';
  user: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name:  ['', Validators.required],
      phone: [''],
      city:  [''],
    });
  }

  ngOnInit(): void {
    this.api.get<any>('/auth/me').subscribe({
      next: (data) => {
        this.user = data;
        this.form.patchValue({
          name:  data.name,
          phone: data.phone,
          city:  data.city,
        });
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.success = '';
    this.error   = '';

    this.api.put('/provider/profile', this.form.value).subscribe({
      next: () => {
        this.success = 'Profil mis à jour avec succès !';
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error   = err.error?.message ?? 'Erreur lors de la mise à jour';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    const role = this.auth.getRole();
    if (role === 'admin')         this.router.navigate(['/admin/dashboard']);
    else if (role === 'provider') this.router.navigate(['/provider/dashboard']);
    else                          this.router.navigate(['/client/home']);
  }
}