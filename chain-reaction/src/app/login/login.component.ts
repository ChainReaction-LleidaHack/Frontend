import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  playerName: string = '';
  playerImage: string | ArrayBuffer | null = null;
  gameState: any;

  constructor(private router: Router, private sessionService: SessionService) {}

  ngOnInit() {
    this.loadGameState();
  }

  loadGameState() {
    const state = localStorage.getItem('gameState');
    if (state) {
      this.gameState = JSON.parse(state);
    }
  }

  startGame() {
    if (this.playerName && this.playerImage && this.gameState) {
      if (this.gameState.isCreator) {
        this.createGame();
      } else {
        this.joinGame();
      }
    } else {
      alert('Siusplau, introdueix el teu nom i una foto.');
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
            image: data.image
          },
          isCreator: false,
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
      reader.onload = () => {
        this.playerImage = reader.result; // Sets image as base64 encoded string
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  }
}
