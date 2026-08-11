import { Directive, ElementRef, AfterViewInit, Input, OnDestroy } from '@angular/core';

/**
 * appReveal
 * Lightweight scroll-reveal directive built on the native IntersectionObserver API.
 * No external animation library — keeps the landing page dependency-free.
 *
 * Usage: <div appReveal>...</div>
 * Optional stagger delay in ms: <div appReveal [revealDelay]="150">...</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal-init');

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      node.classList.add('reveal-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => node.classList.add('reveal-visible'), this.revealDelay);
            this.observer?.unobserve(node);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
