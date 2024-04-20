import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  codigoPartida: string | undefined;
  isCreator: boolean = false;

  constructor(private router: Router) { }

  crearPartida() {
    this.isCreator = true;
    this.saveGameState();
    // Navegar al login
    this.router.navigate(['/login']);
  }

  unirsePartida() {
    this.isCreator = false;
    this.saveGameState();
    // Navegar al login
    this.router.navigate(['/login']);
  }

  private saveGameState() {
    sessionStorage.setItem('gameState', JSON.stringify({
      isCreator: this.isCreator
    }));
  }
}
