import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  user: any;
  categories: any[] = [];
  loading = true;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.loadCategories();
  }

  loadCategories(): void {
    this.api.get<any[]>('/client/categories').subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getCategoryColor(name: string): string {
    const colors: { [key: string]: string } = {
      'Plomberie':    'linear-gradient(135deg, #1e40af, #3b82f6)',
      'Électricité':  'linear-gradient(135deg, #92400e, #f59e0b)',
      'Menuiserie':   'linear-gradient(135deg, #78350f, #d97706)',
      'Maçonnerie':   'linear-gradient(135deg, #7f1d1d, #ef4444)',
      'Peinture':     'linear-gradient(135deg, #831843, #ec4899)',
      'Carrelage':    'linear-gradient(135deg, #064e3b, #10b981)',
      'Climatisation':'linear-gradient(135deg, #0c4a6e, #0ea5e9)',
      'Soudure':      'linear-gradient(135deg, #1c1917, #78716c)',
      'Toiture':      'linear-gradient(135deg, #365314, #84cc16)',
      'Vitrage':      'linear-gradient(135deg, #312e81, #8b5cf6)',
    };
    return colors[name] ?? 'linear-gradient(135deg, #1f2937, #374151)';
  }

  goToSearch(categoryId?: number): void {
    if (categoryId) {
      this.router.navigate(['/client/search'], { queryParams: { category: categoryId } });
    } else {
      this.router.navigate(['/client/search']);
    }
  }

  goToMyRequests(): void {
    this.router.navigate(['/client/my-requests']);
  }

  logout(): void {
    this.auth.logout();
  }

}