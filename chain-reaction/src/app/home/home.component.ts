import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  partyCode: string | undefined;
  isCreator: boolean = false;

  constructor(private router: Router) { }

  crearPartida() {
    this.isCreator = true;
    this.saveGameState();
    this.router.navigate(['/login']);
  }

  unirsePartida() {
    this.isCreator = false;
    this.saveGameState();
    this.router.navigate(['/login']);
  }

  private saveGameState() {
    localStorage.setItem('gameState', JSON.stringify({
      partyCode: this.partyCode,
      isCreator: this.isCreator
    }));
  }
}
