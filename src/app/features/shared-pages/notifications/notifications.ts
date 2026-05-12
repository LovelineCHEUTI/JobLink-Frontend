import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications implements OnInit {

  notifications: any[] = [];
  loading = true;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.api.get<any[]>('/notifications').subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading       = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  markAsRead(id: number): void {
    this.api.put(`/notifications/${id}/read`, {}).subscribe({
      next: () => this.loadNotifications()
    });
  }

  markAllAsRead(): void {
    this.api.put('/notifications/read-all', {}).subscribe({
      next: () => this.loadNotifications()
    });
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.is_read).length;
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'request':      '📬',
      'mission':      '🏁',
      'subscription': '💳',
      'account':      '👤',
    };
    return icons[type] ?? '🔔';
  }

  goBack(): void {
    const role = this.auth.getRole();
    if (role === 'admin')         this.router.navigate(['/admin/dashboard']);
    else if (role === 'provider') this.router.navigate(['/provider/dashboard']);
    else                          this.router.navigate(['/client/home']);
  }
}