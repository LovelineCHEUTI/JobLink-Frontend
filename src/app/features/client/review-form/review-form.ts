import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form.html',
  styleUrl: './review-form.css'
})
export class ReviewForm implements OnInit {

  form: FormGroup;
  loading = false;
  error = '';
  requestId: number = 0;
  hoveredStar = 0;
  selectedRating = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      rating:  [0, [Validators.required, Validators.min(1)]],
      comment: [''],
    });
  }

  ngOnInit(): void {
    this.requestId = +this.route.snapshot.paramMap.get('id')!;
  }

  setRating(rating: number): void {
    this.selectedRating = rating;
    this.form.patchValue({ rating });
  }

  onSubmit(): void {
    if (this.form.invalid || this.selectedRating === 0) {
      this.error = 'Veuillez sélectionner une note';
      return;
    }
    this.loading = true;
    this.error = '';

    const body = {
      service_request_id: this.requestId,
      rating:  this.selectedRating,
      comment: this.form.value.comment,
    };

    this.api.post('/client/reviews', body).subscribe({
      next: () => {
        this.router.navigate(['/client/my-requests']);
      },
      error: (err) => {
        this.error = err.error?.message ?? 'Erreur lors de l\'envoi';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/client/my-requests']);
  }
}