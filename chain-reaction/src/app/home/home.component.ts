import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  partyCode: string = '';
  isCreator: boolean = false;

  constructor(private router: Router, private sessionService: SessionService) { }

  crearPartida() {
    this.isCreator = true;
    this.saveGameState();
    this.router.navigate(['/login']);
  }

  unirsePartida() {
    this.saveGameState();
    this.sessionService.exist(this.partyCode).subscribe({
      next: (response) => {
        if (response) {
          this.isCreator = false;
          this.router.navigate(['/login']);
        } else {
          alert('Aquest codi de partida no existeix');
        }
      },
      error: (error) => {
        console.error('Error checking party:', error);
      }
    });
    
  }

  private saveGameState() {
    localStorage.setItem('gameState', JSON.stringify({
      partyCode: this.partyCode,
      isCreator: this.isCreator,
    }));
  }

  instructions() {
    this.router.navigate(['/instructions']);
  }
}
