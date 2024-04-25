import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

// Define una interfaz para los jugadores, ajusta según tus necesidades
interface Player {
  name: string;
  image: string; // URL de la imagen del jugador
}

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  partyCode: any = '';
  players: Player[] = [];
  isCreator: boolean = false; // Cambia este valor según la lógica de tu aplicación
  maxPlayers: number = 10; // Número máximo de jugadores permitidos
  playerId: any;

  constructor(private ref: ChangeDetectorRef, private router: Router, private sessionService: SessionService) {}

  ngOnInit(): void {
    // Aquí debes cargar el código de la partida y la lista de jugadores
    this.loadGameDetails();
    setInterval(() => {
      this.refreshPlayers();
    }, 5000); 
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

  startGame() {

    if(this.players.length >= 3) {
      this.sessionService.startParty(this.playerId, {}).subscribe({
        next: (response) => {
          console.log('Game started:', response);
        },
        error: (error) => {
          console.error('Error starting game:', error);
        }
      });
      this.router.navigate(['/game']);
    } else {
      alert('Es necessiten mínim 3 jugador per començar la partida!');
    }
    
  }

  refreshPlayers() {
    this.sessionService.refreshParty(this.playerId).subscribe({
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
  }
}
