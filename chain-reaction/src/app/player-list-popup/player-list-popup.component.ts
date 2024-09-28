import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';


interface Player {
  name: string;
  image: string; // URL de la imagen del jugador
  id: any;
}

@Component({
  selector: 'app-player-list-popup',
  templateUrl: './player-list-popup.component.html',
  styleUrl: './player-list-popup.component.scss'
})
export class PlayerListPopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  partyCode: any = '';
  players: Player[] = [];
  isCreator: boolean = false; // Cambia este valor según la lógica de tu aplicación
  maxPlayers: number = 10; // Número máximo de jugadores permitidos
  playerId: any;

  constructor(private ref: ChangeDetectorRef, private router: Router, private sessionService: SessionService) {}

  close() {
    this.closePopup.emit();
  }

  ngOnInit() {
    this.loadGameDetails();
  }
  
  loadGameDetails() {
    // Simulación de datos obtenidos, reemplazar con tu lógica de carga real
    const gameState = localStorage.getItem('gameState');
    if (gameState) {
      const state = JSON.parse(gameState);
      this.partyCode = state.partyCode;
      this.isCreator = state.isCreator;
      this.playerId = state.playerData.playerId;
    }

    this.refreshPlayers();

    this.ref.detectChanges(); 
  }

  public refreshPlayers() {
    this.sessionService.remaining(this.partyCode).subscribe({
      next: (response) => {
        if(response.users) {
          this.players = response.users;
          this.ref.detectChanges(); 
        
        } else if (response.target) {
          this.router.navigate(['/game']);
        }
      },
      error: (error) => {
        console.error('Error al cargar los jugadores:', error);
      }
    });
    console.log(this.players)
  }

  remove_player(player_id: any){
    this.sessionService.remove(player_id, {'id': this.playerId}).subscribe({
      next: (response) => {
        
      },
      error: (error) => {
        console.error('Error al cargar los jugadores:', error);
      }
    });
  }
}


