// game.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  targetPlayer: any;
  isEliminated: boolean = false;
  playerId: any;
  partyCode: any = '';
  remainingPlayers: any = "";

  constructor(private router: Router, private sessionService: SessionService) {
  }

  ngOnInit() {
    const gameState = localStorage.getItem('gameState');
    if (gameState) {
      const state = JSON.parse(gameState);
      this.playerId = state.playerData.playerId;
      this.partyCode = state.partyCode;
    }
    this.refreshGame();
    // setInterval(() => {
    //   this.refreshGame();
    // }, 5000);
  }

  refreshGame() {
    this.sessionService.refreshParty(this.playerId).subscribe({
      next: (response) => {
        this.targetPlayer = response.target;
        this.remainingPlayers = response.remaining_users;
      },
      error: (error) => {
        console.error('Error refreshing game:', error);
      }
    });
  }



  reportElimination() {
    this.sessionService.die(this.partyCode, this.playerId, {}).subscribe({
      next: (response) => {
        this.isEliminated = true;
        console.log('Player eliminated:', response);
      },
      error: (error) => {
        console.error('Error eliminating player:', error);
      }
    });
  }
}
