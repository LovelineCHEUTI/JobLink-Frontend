import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';

@Component({
  selector: 'app-landing-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class LandingHero {
  constructor(private router: Router) {}

  findProvider(): void {
    this.router.navigate(['/auth/register']);
  }

  becomeProvider(): void {
    this.router.navigate(['/auth/register']);
  }
}
