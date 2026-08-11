import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';

interface ServiceCategory {
  name: string;
  icon: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-landing-services-section',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
})
export class LandingServicesSection {
  /**
   * Catégories reprises telles quelles de database/seeders/CategorySeeder.php
   * (le endpoint /client/categories étant protégé par authentification,
   * il n'y a pas d'API publique à consommer ici).
   */
  categories: ServiceCategory[] = [
    { name: 'Plomberie', icon: '🔧', description: 'Réparation et installation de plomberie', color: 'from-indigo-600/30 to-indigo-900/10' },
    { name: 'Électricité', icon: '⚡', description: 'Installation et réparation électrique', color: 'from-amber-500/30 to-amber-900/10' },
    { name: 'Menuiserie', icon: '🪚', description: 'Travaux de menuiserie et charpente', color: 'from-orange-600/30 to-orange-900/10' },
    { name: 'Maçonnerie', icon: '🧱', description: 'Construction et rénovation', color: 'from-red-600/30 to-red-900/10' },
    { name: 'Peinture', icon: '🖌️', description: 'Peinture intérieure et extérieure', color: 'from-purple-600/30 to-purple-900/10' },
    { name: 'Carrelage', icon: '🏗️', description: 'Pose de carrelage et revêtement', color: 'from-teal-600/30 to-teal-900/10' },
    { name: 'Climatisation', icon: '❄️', description: 'Installation et entretien climatisation', color: 'from-sky-600/30 to-sky-900/10' },
    { name: 'Soudure', icon: '🔩', description: 'Travaux de soudure et métallerie', color: 'from-gray-600/30 to-gray-900/10' },
    { name: 'Toiture', icon: '🏠', description: 'Réparation et construction de toiture', color: 'from-rose-600/30 to-rose-900/10' },
    { name: 'Vitrage', icon: '🪟', description: 'Installation et remplacement de vitres', color: 'from-cyan-600/30 to-cyan-900/10' },
  ];

  constructor(private router: Router) {}

  selectCategory(): void {
    // Pas de recherche publique disponible actuellement : on oriente vers l'inscription.
    this.router.navigate(['/auth/register']);
  }
}
