import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.html',
  styleUrl: './requests.css'
})
export class Requests implements OnInit {

  requests: any[] = [];
  loading = true;
  activeFilter = 'all';

  filters = [
    { key: 'all',       label: 'Toutes' },
    { key: 'pending',   label: 'En attente' },
    { key: 'accepted',  label: 'Acceptées' },
    { key: 'completed', label: 'Terminées' },
    { key: 'rejected',  label: 'Refusées' },
  ];

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.api.get<any[]>('/provider/requests').subscribe({
      next: (data) => {
        this.requests = data;
        this.loading  = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get filteredRequests(): any[] {
    if (this.activeFilter === 'all') return this.requests;
    return this.requests.filter(r => r.status === this.activeFilter);
  }

  accept(id: number): void {
    this.api.put(`/provider/requests/${id}/accept`, {}).subscribe({
      next: () => this.loadRequests()
    });
  }

  reject(id: number): void {
    if (!confirm('Refuser cette demande ?')) return;
    this.api.put(`/provider/requests/${id}/reject`, {}).subscribe({
      next: () => this.loadRequests()
    });
  }

  complete(id: number): void {
    if (!confirm('Marquer cette mission comme terminée ?')) return;
    this.api.put(`/provider/requests/${id}/complete`, {}).subscribe({
      next: () => this.loadRequests()
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'pending':   'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
      'accepted':  'bg-green-500/20 border-green-500/30 text-green-400',
      'rejected':  'bg-red-500/20 border-red-500/30 text-red-400',
      'completed': 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    };
    return colors[status] ?? 'bg-gray-500/20 border-gray-500/30 text-gray-400';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'pending':   '⏳ En attente',
      'accepted':  '✅ Acceptée',
      'rejected':  '❌ Refusée',
      'completed': '🏁 Terminée',
    };
    return labels[status] ?? status;
  }

  getStatusBand(status: string): string {
    const bands: { [key: string]: string } = {
      'pending':   'bg-yellow-500',
      'accepted':  'bg-green-500',
      'rejected':  'bg-red-500',
      'completed': 'bg-blue-500',
    };
    return bands[status] ?? 'bg-gray-500';
  }

  goBack(): void {
    this.router.navigate(['/provider/dashboard']);
  }
}