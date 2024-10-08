import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import Pica from 'pica';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  playerName: string = '';
  playerImage: string | ArrayBuffer | null = null;
  gameState: any;

  isCreator: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private sessionService: SessionService) {}

  ngOnInit() {
    this.loadGameState();
  }

  loadGameState() {
    const state = localStorage.getItem('gameState');
    if (state) {
      this.gameState = JSON.parse(state);
      this.isCreator = this.gameState.isCreator;
    }
  }

  startGame() {
    if (this.isLoading) {
      return; // Si ya está en curso una solicitud, no hagas nada
    }

    if (this.playerName && this.playerImage && this.gameState) {
      this.isLoading = true; // Indica que la solicitud está en curso
      if (this.gameState.isCreator) {
        this.createGame();
      } else {
        this.joinGame();
      }
    } else {
      alert('Siusplau, introdueix el teu nom i una foto');
    }
  }

  createGame() {
    const data = {
      name: this.playerName,
      image: this.playerImage
    };
    console.log('Creating party with data:', data);
    this.sessionService.createParty(data).subscribe({
      next: (response) => {
        const gameState = {
          partyCode: response.party.code,
          playerData: {
            playerId: response.user,
            name: data.name,
            image: data.image
          },
          isCreator: true,
          isEliminated: false,
        };
        localStorage.setItem('gameState', JSON.stringify(gameState));        
        this.router.navigate(['/lobby']); 
      },
      error: (error) => {
        console.error('Error creating party:', error);
      }
    });
  }

  joinGame() {
    const data = {
      name: this.playerName,
      image: this.playerImage
    };
    this.sessionService.joinParty(this.gameState.partyCode, data).subscribe({
      next: (response) => {
        const gameState = {
          partyCode: this.gameState.partyCode,
          playerData: {
            playerId: response.user_id,
            name: data.name,
            image: data.image,
          },
          isCreator: false,
          isEliminated: false
        };
        localStorage.setItem('gameState', JSON.stringify(gameState)); 
        this.router.navigate(['/lobby']); 
      },
      error: (error) => {
        console.error('Error joining party:', error);
      }
    });
  }

  handleImage(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        if (!e.target || typeof e.target.result !== 'string') {
          console.error('Error reading image file');
          return;
        }
        img.src = e.target.result as string;
        img.onload = () => {
          const pica = Pica();
  
          const canvasSource = document.createElement('canvas');
          const size = Math.min(img.width, img.height); // Tomamos el lado más pequeño para hacer la imagen cuadrada
          canvasSource.width = size;
          canvasSource.height = size;
  
          const ctx = canvasSource.getContext('2d');
          if (!ctx) {
            console.error('Error creating canvas context');
            return;
          }
  
          // Recortar la imagen centrada para que sea cuadrada
          const offsetX = (img.width - size) / 2;
          const offsetY = (img.height - size) / 2;
          ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);
  
          const canvasDest = document.createElement('canvas');
          const newSize = 400; // Tamaño final cuadrado de la imagen
          canvasDest.width = newSize;
          canvasDest.height = newSize;
  
          pica.resize(canvasSource, canvasDest, {
            unsharpAmount: 80,
            unsharpRadius: 0.6,
            unsharpThreshold: 2
          })
          .then((result: any) => pica.toBlob(result, 'image/jpeg', 0.8))
          .then((blob: Blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              this.playerImage = reader.result;
            };
            reader.readAsDataURL(blob);
          })
          .catch((error: any) => {
            console.error('Error processing image with Pica:', error);
          });
        };
      };
      reader.readAsDataURL(file);
    }
  }  
}
