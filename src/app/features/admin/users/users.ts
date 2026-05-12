import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  users: any[] = [];
  loading = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.api.get<any[]>('/admin/users').subscribe({
      next: (data) => {
        this.users   = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggle(id: number): void {
    this.api.put(`/admin/users/${id}/toggle`, {}).subscribe({
      next: () => this.loadUsers()
    });
  }

  delete(id: number): void {
    if (!confirm('Supprimer ce compte ?')) return;
    this.api.delete(`/admin/users/${id}`).subscribe({
      next: () => this.loadUsers()
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}