import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './my-requests.html',
  styleUrl: './my-requests.css'
})
export class MyRequests implements OnInit {

  requests: any[] = [];
  loading = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.api.get<any[]>('/client/requests').subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
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

  cancelRequest(id: number): void {
    if (!confirm('Annuler cette demande ?')) return;
    this.api.delete(`/client/requests/${id}`).subscribe({
      next: () => this.loadRequests()
    });
  }

  goToReview(requestId: number): void {
    this.router.navigate(['/client/review', requestId]);
  }

  goBack(): void {
    this.router.navigate(['/client/home']);
  }
}