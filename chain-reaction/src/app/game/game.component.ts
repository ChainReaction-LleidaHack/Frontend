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
  totalUsers: any = "";
  numKills: any = 0;
  winnerKills: any = 0;
  private refreshInterval: any;


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
    this.refreshInterval = setInterval(() => {
      this.refreshGame();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  refreshGame() {
    this.sessionService.refreshParty(this.playerId).subscribe({
      next: (response) => {
        if(response.winner){
          console.log('Winner:', response.winner);
          this.isWinner = true;
          this.playerData = response.winner;
          this.targetPlayer = response.winner;
          this.winnerKills = response.winner.num_killed;
        } else {
          if(!this.isEliminated) {
            this.targetPlayer = response.target;
          } else {
            this.targetPlayer = this.playerData;
          }
          
        }
        this.remainingPlayers = response.remaining_users;
        this.totalUsers = response.total_users;
        this.numKills = response.num_killed;
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
          playerData : this.playerData,
          isEliminated : this.isEliminated,
          partyCode : this.partyCode,

        }));
      },
      error: (error) => {
        console.error('Error eliminating player:', error);
      }
    });
    this.targetPlayer = this.playerData;
  }

  goHome() {
    clearInterval(this.refreshInterval); // Detiene el intervalo
    localStorage.removeItem('gameState');
    this.router.navigate(['/home']);
  }

}
