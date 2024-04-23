import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent implements OnInit {
  constructor(private router: Router, private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    setTimeout(() => {
      this.fadeOut();
    }, 3000);
  }

  fadeOut() {
    const splashElement = this.el.nativeElement.querySelector('.splash-screen');
    this.renderer.setStyle(splashElement, 'opacity', '0');
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }


}
