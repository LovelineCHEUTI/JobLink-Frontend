import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {

  providers: any[] = [];
  loading = false;
  searchTerm = '';
  cityTerm = '';
  categoryId: number | null = null;
  currentPage = 1;
  lastPage = 1;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['category'] ? +params['category'] : null;
      this.search();
    });
  }

  search(): void {
    this.loading = true;
    let endpoint = `/providers?page=${this.currentPage}`;
    if (this.searchTerm) endpoint += `&search=${this.searchTerm}`;
    if (this.cityTerm)   endpoint += `&city=${this.cityTerm}`;
    if (this.categoryId) endpoint += `&category_id=${this.categoryId}`;

    this.api.get<any>(endpoint).subscribe({
      next: (data) => {
        this.providers = data.data;
        this.lastPage  = data.last_page;
        this.loading   = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToProvider(id: number): void {
    this.router.navigate(['/client/provider', id]);
  }

  goBack(): void {
    this.router.navigate(['/client/home']);
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.currentPage++;
      this.search();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.search();
    }
  }

  getStars(rating: number): string[] {
    return Array(5).fill('').map((_, i) => i < Math.round(rating) ? '★' : '☆');
  }
}