import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Correcto, importa las dependencias necesarias aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregido de 'styleUrl' a 'styleUrls'
})
export class AppComponent {
  title = 'chain-reaction';
}
