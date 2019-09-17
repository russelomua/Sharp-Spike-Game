import { Injectable } from '@angular/core';
import { Board } from './board';

@Injectable({
  providedIn: 'root'
})

export class PlayerPosition {
  constructor(public board: Board) {
    this.maxPosition = board.lines;
  }

  line: number = 1;
  maxPosition: number;

  down() {
    if (this.line === this.maxPosition) {
      return;
    }
    this.line++;
  }

  up() {
    if (this.line === 1) {
      return;
    }
    this.line--;
  }
}
