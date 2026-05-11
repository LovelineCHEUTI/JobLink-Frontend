import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-provider-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-detail.html',
  styleUrl: './provider-detail.css'
})
export class ProviderDetail implements OnInit {

  provider: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadProvider(id);
  }

  loadProvider(id: any): void {
    this.api.get<any>(`/providers/${id}`).subscribe({
      next: (data) => {
        this.provider = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getStars(rating: number): string[] {
    return Array(5).fill('').map((_, i) => i < Math.round(rating) ? '★' : '☆');
  }

  goToRequest(): void {
    this.router.navigate(['/client/request', this.provider.id]);
  }

  goBack(): void {
    this.router.navigate(['/client/search']);
  }
}