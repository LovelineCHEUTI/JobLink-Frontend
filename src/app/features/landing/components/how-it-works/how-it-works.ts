import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-landing-how-it-works',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class LandingHowItWorks {
  steps: Step[] = [
    {
      number: '01',
      title: 'Recherchez',
      description: 'Trouvez rapidement le service ou le professionnel dont vous avez besoin.',
      icon: 'search',
    },
    {
      number: '02',
      title: 'Choisissez',
      description: 'Comparez les profils et choisissez le professionnel qui vous convient.',
      icon: 'check',
    },
    {
      number: '03',
      title: 'Faites votre demande',
      description: 'Envoyez votre demande et échangez avec le prestataire.',
      icon: 'send',
    },
    {
      number: '04',
      title: 'Profitez du service',
      description: 'Recevez votre prestation et évaluez votre expérience.',
      icon: 'star',
    },
  ];
}
