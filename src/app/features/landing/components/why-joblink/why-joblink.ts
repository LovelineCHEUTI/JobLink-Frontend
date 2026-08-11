import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal';

interface Advantage {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-landing-why-joblink',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './why-joblink.html',
  styleUrl: './why-joblink.css',
})
export class LandingWhyJoblink {
  advantages: Advantage[] = [
    { title: 'Professionnels accessibles facilement', icon: 'users' },
    { title: 'Recherche rapide et simple', icon: 'bolt' },
    { title: 'Suivi des demandes', icon: 'clipboard' },
    { title: 'Paiements sécurisés', icon: 'shield' },
    { title: 'Évaluations et avis', icon: 'star' },
    { title: 'Plateforme accessible partout', icon: 'globe' },
  ];
}
