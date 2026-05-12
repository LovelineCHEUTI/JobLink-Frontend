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

  stats: any = {};
  loading = true;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.api.get<any>('/admin/dashboard').subscribe({
      next: (data) => {
        this.stats   = data.stats;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goTo(path: string): void {
    this.router.navigate([`/admin/${path}`]);
  }

  logout(): void {
    this.auth.logout();
  }
}