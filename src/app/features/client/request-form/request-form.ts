import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-form.html',
  styleUrl: './request-form.css'
})
export class RequestForm implements OnInit {

  form: FormGroup;
  loading = false;
  error = '';
  providerId: number = 0;
  provider: any = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      title:        ['', [Validators.required, Validators.minLength(5)]],
      description:  ['', [Validators.required, Validators.minLength(10)]],
      location:     ['', [Validators.required]],
      desired_date: [''],
    });
  }

  ngOnInit(): void {
    this.providerId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProvider();
  }

  loadProvider(): void {
    this.api.get<any>(`/providers/${this.providerId}`).subscribe({
      next: (data) => {
        this.provider = data;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    const body = { ...this.form.value, provider_id: this.providerId };

    this.api.post('/client/requests', body).subscribe({
      next: () => {
        this.router.navigate(['/client/my-requests']);
      },
      error: (err) => {
        this.error = err.error?.message ?? 'Erreur lors de l\'envoi';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/client/provider', this.providerId]);
  }
}