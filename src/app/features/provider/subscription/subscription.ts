import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription.html',
  styleUrl: './subscription.css'
})
export class Subscription implements OnInit {

  subscription: any = null;
  loading = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.api.get<any>('/provider/subscription').subscribe({
      next: (data) => {
        this.subscription = data;
        this.loading      = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'monthly':   'Mensuel',
      'quarterly': 'Trimestriel',
      'annual':    'Annuel',
    };
    return labels[type] ?? type;
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'active':  'bg-green-500/20 border-green-500/30 text-green-400',
      'expired': 'bg-red-500/20 border-red-500/30 text-red-400',
      'blocked': 'bg-gray-500/20 border-gray-500/30 text-gray-400',
    };
    return colors[status] ?? 'bg-gray-500/20 border-gray-500/30 text-gray-400';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'active':  '✅ Actif',
      'expired': '❌ Expiré',
      'blocked': '🚫 Bloqué',
    };
    return labels[status] ?? status;
  }

  getDaysLeft(): number {
    if (!this.subscription?.expires_at) return 0;
    const expiry = new Date(this.subscription.expires_at);
    const today  = new Date();
    const diff   = expiry.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  goBack(): void {
    this.router.navigate(['/provider/dashboard']);
  }
}