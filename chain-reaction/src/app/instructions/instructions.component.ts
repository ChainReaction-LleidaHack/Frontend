// instructions.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  constructor(private router: Router) { }

  instructions = [
    {
      title: 'Pas 1',
      text: 'Reuneix al teu grup d\'amics. Crea o uneix-te a una partida.',
      image: 'assets/icons/pas1.svg'
    },
    {
      title: 'Pas 2',
      text: 'Fica el teu nom. Somriu i fes-te una foto.',
      image: 'assets/icons/pas2.svg'
    },
    {
      title: 'Pas 3',
      text: 'Entre tots, decidiu el mètode per acabar amb els jugadors. Exemple: Picar l\'ullet.',
      image: 'assets/icons/pas3.svg'
    },
    {
      title: 'Pas 4',
      text: 'Si t\'han assassinat, prem el botó "He mort" :(',
      image: 'assets/icons/pas4.svg'
    }
  ];

  goHome() {
    this.router.navigate(['/home']);
  }
}
