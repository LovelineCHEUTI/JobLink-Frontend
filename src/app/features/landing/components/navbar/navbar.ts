import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class LandingNavbar {
  scrolled = false;
  mobileOpen = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 12;
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobile(): void {
    this.mobileOpen = false;
  }

  scrollTo(id: string): void {
    this.closeMobile();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  goToLogin(): void {
    this.closeMobile();
    this.router.navigate(['/auth/login']);
  }

  goToRegister(): void {
    this.closeMobile();
    this.router.navigate(['/auth/register']);
  }
}
