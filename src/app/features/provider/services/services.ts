import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {

  services: any[] = [];
  categories: any[] = [];
  loading = true;
  showForm = false;
  editingService: any = null;
  form: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      category_id:  ['', Validators.required],
      title:        ['', [Validators.required, Validators.minLength(3)]],
      description:  [''],
      price:        [''],
    });
  }

  ngOnInit(): void {
    this.loadServices();
    this.loadCategories();
  }

  loadServices(): void {
    this.api.get<any[]>('/provider/services').subscribe({
      next: (data) => {
        this.services = data;
        this.loading  = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadCategories(): void {
    this.api.get<any[]>('/client/categories').subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      }
    });
  }

  openForm(service?: any): void {
    this.editingService = service ?? null;
    if (service) {
      this.form.patchValue({
        category_id:  service.category_id,
        title:        service.title,
        description:  service.description,
        price:        service.price,
      });
    } else {
      this.form.reset();
    }
    this.showForm = true;
    this.cdr.detectChanges();
  }

  closeForm(): void {
    this.showForm = false;
    this.editingService = null;
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const request$ = this.editingService
      ? this.api.put(`/provider/services/${this.editingService.id}`, this.form.value)
      : this.api.post('/provider/services', this.form.value);

    request$.subscribe({
      next: () => {
        this.closeForm();
        this.loadServices();
      }
    });
  }

  deleteService(id: number): void {
    if (!confirm('Supprimer ce service ?')) return;
    this.api.delete(`/provider/services/${id}`).subscribe({
      next: () => this.loadServices()
    });
  }

  goBack(): void {
    this.router.navigate(['/provider/dashboard']);
  }
}