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
    // Aquí lógica para crear una partida
    // Simulación de creación de partida
    this.codigoPartida = '123456'; // Supongamos que este es el código generado
    // Guardar estado
    this.saveGameState();
    // Navegar al login
    this.router.navigate(['/login']);
  }

  unirsePartida() {
    this.isCreator = false;
    // Aquí lógica para unirse a una partida usando `this.codigoPartida`
    // Guardar estado
    this.saveGameState();
    // Navegar al login
    this.router.navigate(['/login']);
  }

  private saveGameState() {
    sessionStorage.setItem('gameState', JSON.stringify({
      codigoPartida: this.codigoPartida,
      isCreator: this.isCreator
    }));
  }
}
