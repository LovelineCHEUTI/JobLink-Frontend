import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';

@Component({
  selector: 'app-landing-client-section',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './client-section.html',
  styleUrl: './client-section.css',
})
export class LandingClientSection {
  benefits = [
    'Trouver facilement des professionnels',
    'Consulter les services proposés',
    'Envoyer des demandes',
    'Suivre ses demandes',
    'Effectuer ses paiements',
    'Évaluer les prestations',
  ];

  constructor(private router: Router) {}

  findProvider(): void {
    this.router.navigate(['/auth/register']);
  }
}
