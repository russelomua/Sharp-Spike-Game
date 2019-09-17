import { Board } from './board';

export class Spike {
  constructor(public board: Board, line: number) {
    this.column = board.cols;
    this.line = line;
  }
  public line: number;
  public column: number;

  public stepUp() {
    if (this.column === 1) {
      return;
    }
    this.column--;
  }

  public isZeroPosition() {
    return this.column === 1;
  }
}
