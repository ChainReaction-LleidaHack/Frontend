// game.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  targetPlayer: any;
  alivePlayers: any[];
  isEliminated: boolean = false;

  constructor() {
    this.alivePlayers = [
      { name: "Player 1", image: "../assets/user.png", isAlive: true },
      { name: "Player 2", image: "../assets/user.png", isAlive: true },
      // Añadir más jugadores
    ];
    this.targetPlayer = this.alivePlayers[0];
  }

  reportElimination() {
    this.isEliminated = true; // Marcar al jugador como eliminado
    this.alivePlayers = this.alivePlayers.filter(player => player.isAlive && player !== this.targetPlayer);
    this.targetPlayer = this.alivePlayers[0] || {};
  }
}
