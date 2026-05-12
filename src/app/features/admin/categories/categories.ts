import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {

  categories: any[] = [];
  loading = true;
  showForm = false;
  editingCategory: any = null;
  form: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name:        ['', Validators.required],
      icon:        ['🔧'],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.api.get<any[]>('/admin/categories').subscribe({
      next: (data) => {
        this.categories = data;
        this.loading    = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openForm(category?: any): void {
    this.editingCategory = category ?? null;
    if (category) {
      this.form.patchValue({
        name:        category.name,
        icon:        category.icon,
        description: category.description,
      });
    } else {
      this.form.reset({ icon: '🔧' });
    }
    this.showForm = true;
    this.cdr.detectChanges();
  }

  closeForm(): void {
    this.showForm        = false;
    this.editingCategory = null;
    this.form.reset({ icon: '🔧' });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const request$ = this.editingCategory
      ? this.api.put(`/admin/categories/${this.editingCategory.id}`, this.form.value)
      : this.api.post('/admin/categories', this.form.value);

    request$.subscribe({
      next: () => {
        this.closeForm();
        this.loadCategories();
      }
    });
  }

  delete(id: number): void {
    if (!confirm('Supprimer cette catégorie ?')) return;
    this.api.delete(`/admin/categories/${id}`).subscribe({
      next: () => this.loadCategories()
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}