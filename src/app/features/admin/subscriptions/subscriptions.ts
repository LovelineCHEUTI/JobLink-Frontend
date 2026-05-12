import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.css'
})
export class Subscriptions implements OnInit {

  subscriptions: any[] = [];
  providers: any[] = [];
  loading = true;
  showForm = false;
  form: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      user_id: ['', Validators.required],
      type:    ['monthly', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSubscriptions();
    this.loadProviders();
  }

  loadSubscriptions(): void {
    this.api.get<any[]>('/admin/subscriptions').subscribe({
      next: (data) => {
        this.subscriptions = data;
        this.loading       = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadProviders(): void {
    this.api.get<any[]>('/admin/providers').subscribe({
      next: (data) => {
        this.providers = data;
        this.cdr.detectChanges();
      }
    });
  }

  renew(id: number): void {
    this.api.put(`/admin/subscriptions/${id}/renew`, {}).subscribe({
      next: () => this.loadSubscriptions()
    });
  }

  block(id: number): void {
    if (!confirm('Bloquer cet abonnement ?')) return;
    this.api.put(`/admin/subscriptions/${id}/block`, {}).subscribe({
      next: () => this.loadSubscriptions()
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.api.post('/admin/subscriptions', this.form.value).subscribe({
      next: () => {
        this.showForm = false;
        this.form.reset({ type: 'monthly' });
        this.loadSubscriptions();
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'active':  'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      'expired': 'bg-red-500/10 border-red-500/20 text-red-400',
      'blocked': 'bg-gray-500/10 border-gray-500/20 text-gray-400',
    };
    return colors[status] ?? 'bg-gray-500/10 border-gray-500/20 text-gray-400';
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'monthly':   'Mensuel',
      'quarterly': 'Trimestriel',
      'annual':    'Annuel',
    };
    return labels[type] ?? type;
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}