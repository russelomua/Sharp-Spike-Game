export class Spike {
  constructor(line: number, column: number) {
    this.column = column;
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

  public getCost() {
    return Math.round(Math.random() * 25);
  }
}
