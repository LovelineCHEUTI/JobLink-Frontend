import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  user: any;
  stats: any = {};
  recentRequests: any[] = [];
  loading = true;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.api.get<any>('/provider/dashboard').subscribe({
      next: (data) => {
        this.stats          = data.stats;
        this.recentRequests = data.recent_requests;
        this.loading        = false;
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

  goToRequests(): void { this.router.navigate(['/provider/requests']); }
  goToServices(): void { this.router.navigate(['/provider/services']); }
  goToProfile():  void { this.router.navigate(['/provider/profile']); }
  goToSubscription(): void { this.router.navigate(['/provider/subscription']); }

  logout(): void { this.auth.logout(); }
}