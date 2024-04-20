import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  playerName: string = '';
  playerImage: string | ArrayBuffer | null = null;
  gameState: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadGameState();
  }

  loadGameState() {
    const state = sessionStorage.getItem('gameState');
    if (state) {
      this.gameState = JSON.parse(state);
    }
  }

  startGame() {
    if (this.playerName && this.playerImage && this.gameState) {
      // Enviar al backend el nombre, la foto y el estado de la partida
      console.log('Nombre:', this.playerName);
      console.log('Foto:', this.playerImage);
      console.log('Estado del juego:', this.gameState);

      // Navegar al lobby o donde sea necesario
      this.router.navigate(['/lobby']);  // Ajusta según tu lógica de navegación
    } else {
      alert('Por favor, introduce un nombre y toma una foto.');
    }
  }

  handleImage(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.playerImage = reader.result; // Sets image as base64 encoded string
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  }
}
