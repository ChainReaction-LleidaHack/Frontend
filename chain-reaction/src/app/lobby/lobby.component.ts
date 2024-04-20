import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';

// Define una interfaz para los jugadores, ajusta según tus necesidades
interface Player {
  name: string;
  image: string; // URL de la imagen del jugador
}

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  codigoPartida: string = '';
  players: Player[] = [];
  isCreator: boolean = false; // Cambia este valor según la lógica de tu aplicación
  maxPlayers: number = 10; // Número máximo de jugadores permitidos

  constructor(private ref: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    // Aquí debes cargar el código de la partida y la lista de jugadores
    this.loadGameDetails();
  }

  loadGameDetails() {
    // Simulación de datos obtenidos, reemplazar con tu lógica de carga real
    this.codigoPartida = 'ABC123';
    this.players = [
      { name: 'Jugador 1', image: '../assets/user.png' },
      { name: 'Jugador 2', image: '../assets/user.png' },
      { name: 'Jugador 3', image: '../assets/user.png' },
      { name: 'Jugador 4', image: '../assets/user.png' },
      { name: 'Jugador 5', image: '../assets/user.png' },
      { name: 'Jugador 6', image: '../assets/user.png' }
    ];

    // Simulación de chequeo de si el usuario actual es el creador
    // Necesitarás reemplazar esto con tu lógica que verifique si el usuario actual es el creador de la partida
    this.isCreator = true; // Simulación, establece esto en función de la lógica de tu aplicación
    this.ref.detectChanges(); // Actualiza la vista
  }

  startGame() {
    // Lógica para iniciar el juego
    console.log('El juego ha comenzado!');
    this.router.navigate(['/game']);

    // Aquí agregarías la llamada para comenzar el juego en el servidor, etc.
  }
}
