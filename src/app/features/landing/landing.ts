import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

import { LandingNavbar } from './components/navbar/navbar';
import { LandingHero } from './components/hero/hero';
import { LandingHowItWorks } from './components/how-it-works/how-it-works';
import { LandingClientSection } from './components/client-section/client-section';
import { LandingProviderSection } from './components/provider-section/provider-section';
import { LandingServicesSection } from './components/services-section/services-section';
import { LandingWhyJoblink } from './components/why-joblink/why-joblink';
import { LandingCta } from './components/cta/cta';
import { LandingFooter } from './components/footer/footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    LandingNavbar,
    LandingHero,
    LandingHowItWorks,
    LandingClientSection,
    LandingProviderSection,
    LandingServicesSection,
    LandingWhyJoblink,
    LandingCta,
    LandingFooter,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Un utilisateur déjà connecté ne doit pas revoir la page marketing :
    // on le renvoie directement vers son espace.
    if (this.auth.isLoggedIn()) {
      const role = this.auth.getRole();
      switch (role) {
        case 'client':
          this.router.navigate(['/client/home']);
          break;
        case 'provider':
          this.router.navigate(['/provider/dashboard']);
          break;
        case 'admin':
          this.router.navigate(['/admin/dashboard']);
          break;
      }
    }
  }
}
