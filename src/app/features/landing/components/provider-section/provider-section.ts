import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';

@Component({
  selector: 'app-landing-provider-section',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './provider-section.html',
  styleUrl: './provider-section.css',
})
export class LandingProviderSection {
  benefits = [
    'Créer son profil professionnel',
    'Présenter ses services',
    'Recevoir des demandes',
    'Gérer ses prestations',
    'Développer sa visibilité',
    'Recevoir des évaluations',
  ];

  constructor(private router: Router) {}

  becomeProvider(): void {
    this.router.navigate(['/auth/register']);
  }
}
