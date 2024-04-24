// game.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  targetPlayer: any;
  isEliminated: boolean = false;
  playerId: any;
  partyCode: any = '';
  remainingPlayers: any = "";
  playerData: any = {};
  isWinner: boolean = false;

  constructor(private router: Router, private sessionService: SessionService) {
  }

  ngOnInit() {
    const gameState = localStorage.getItem('gameState');
    if (gameState) {
      const state = JSON.parse(gameState);
      this.playerId = state.playerData.playerId;
      this.partyCode = state.partyCode;
      this.playerData = state.playerData;
      if(state.isEliminated){
        this.isEliminated = true;
      }
    }
    this.refreshGame();
    setInterval(() => {
      this.refreshGame();
    }, 5000);
  }

  refreshGame() {
    this.sessionService.refreshParty(this.playerId).subscribe({
      next: (response) => {
        this.targetPlayer = response.target;
        this.remainingPlayers = response.remaining_users;
        if(response.winner){
          this.isWinner = true;
          this.playerData = response.winner;
        }
      },
      error: (error) => {
        console.error('Error refreshing game:', error);
      }
    });
  }

  reportElimination() {
    this.sessionService.die(this.playerId, {}).subscribe({
      next: (response) => {
        this.isEliminated = true;
        console.log('Player eliminated:', response);
        localStorage.setItem('gameState', JSON.stringify({
          isEliminated : this.isEliminated,
        }));
      },
      error: (error) => {
        console.error('Error eliminating player:', error);
      }
    });
    this.targetPlayer = this.playerData;
  }

  goHome() {
    this.router.navigate(['/home']);
    localStorage.removeItem('gameState');
  }
}
