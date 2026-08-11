import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';

@Component({
  selector: 'app-landing-cta',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './cta.html',
  styleUrl: './cta.css',
})
export class LandingCta {
  constructor(private router: Router) {}

  start(): void {
    this.router.navigate(['/auth/register']);
  }

  discoverServices(): void {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
