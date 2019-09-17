import {
  Injectable
} from '@angular/core';
import {
  Spike
} from './spike';
import {
  Board
} from './board';

@Injectable({
  providedIn: 'root'
})

export class Bag {
  private bag: Spike[] = [];

  constructor(private board: Board) {}

  private fillBag() {
    for (let i = 1; i <= this.board.lines; i++) {
      this.bag.push(new Spike(this.board, i));
    }
  }

  public getRandom() {
    this.shuffleBag();
    return this.bag.pop();
  }

  private shuffleBag(): void {
    if (this.bag.length === 0) {
      this.fillBag();
    }
    for (let i = 0; i < this.bag.length; i++) {
      const randomChoiceIndex = this.getRandomIndex(i, this.bag.length - 1);
      [this.bag[i], this.bag[randomChoiceIndex]] = [this.bag[randomChoiceIndex], this.bag[i]];
    }
  }

  private getRandomIndex(min: number, max: number) {
    return Math.floor(Math.random() * ((max - min) + 1) + min);
  }
}
