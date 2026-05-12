import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './providers.html',
  styleUrl: './providers.css'
})
export class Providers implements OnInit {

  providers: any[] = [];
  loading = true;
  activeFilter = 'all';

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    this.api.get<any[]>('/admin/providers').subscribe({
      next: (data) => {
        this.providers = data;
        this.loading   = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get filteredProviders(): any[] {
    if (this.activeFilter === 'pending') {
      return this.providers.filter(p => !p.provider_profile?.is_validated);
    }
    if (this.activeFilter === 'validated') {
      return this.providers.filter(p => p.provider_profile?.is_validated);
    }
    return this.providers;
  }

  validate(id: number): void {
    this.api.put(`/admin/providers/${id}/validate`, {}).subscribe({
      next: () => this.loadProviders()
    });
  }

  toggle(id: number): void {
    this.api.put(`/admin/providers/${id}/toggle`, {}).subscribe({
      next: () => this.loadProviders()
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}