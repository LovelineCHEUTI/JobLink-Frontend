import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

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
      name:        ['', Validators.required],
      phone:       [''],
      city:        [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.api.get<any>('/auth/me').subscribe({
      next: (data) => {
        this.user = data;
        this.form.patchValue({
          name:        data.name,
          phone:       data.phone,
          city:        data.city,
          description: data.provider_profile?.description,
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
    this.router.navigate(['/provider/dashboard']);
  }
}