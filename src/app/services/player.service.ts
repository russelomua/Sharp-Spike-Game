import { Injectable } from '@angular/core';
import { PlayerPosition } from '../class/player-position';
import { Board } from '../class/board';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private position: PlayerPosition,
    private board: Board,
  ) {
  }

  score: number = 0;

  public moveUp() {
    this.position.up();
  }

  public moveDown() {
    this.position.down();
  }

  public getLine() {
    return this.position.line;
  }
}
