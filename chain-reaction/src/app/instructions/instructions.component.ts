import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  constructor(private router: Router) { }
  currentIndex = 0;
  instructions = [
    {
      title: 'Paso 1',
      text: 'Descripción del primer paso del juego.',
      image: 'path_to_image1.jpg'
    },
    {
      title: 'Paso 2',
      text: 'Descripción del segundo paso del juego.',
      image: 'path_to_image2.jpg'
    },
    {
      title: 'Paso 3',
      text: 'Descripción del tercer paso del juego.',
      image: 'path_to_image3.jpg'
    }
  ];

  navigate(direction: string): void {
    if (direction === 'next') {
      this.currentIndex = Math.min(this.currentIndex + 1, this.instructions.length - 1);
    } else if (direction === 'prev') {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    }
  }

  goHome(){
    this.router.navigate(['/home']);
  }

}
