import { Injectable } from '@angular/core';
import { Spike } from '../class/spike';
import { Bag } from '../class/bag';
import { interval } from 'rxjs';
import { Board } from '../class/board';
import { Difficult } from '../class/dificult';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public spikes: Spike[] = [];
  private spikesBag: Bag<Spike>;
  private difficultBag: Bag<Difficult>;
  public spikesPerColumn = 1;

  constructor(public board: Board) {
    this.start();
    const difficult = 'normal';
    this.spikesBag = new Bag<Spike>(Spike, this.board.lines, this.board.cols);
    this.difficultBag = new Bag<Difficult>(
      Difficult,
      this.board.difficultTemplates[difficult].length,
      this.board.difficultTemplates[difficult]
    );
  }

  getFromBag() {
    const difficult = this.difficultBag.getRandom();

    if (difficult.number === 0) {
      return;
    }

    for (let i = 0; i < difficult.number; i++) {
      this.spikes.push(this.spikesBag.getRandom());
    }
  }

  moveCurrent() {
    this.spikes.forEach(spike => {
      spike.stepUp();
    });
  }

  removeOut() {
    const toRemove = this.spikes.filter(spike => spike.isZeroPosition());

    toRemove.forEach(item => {
      const index = this.spikes.indexOf(item);
      
      this.spikes.splice(index, 1);
    });
  }

  step() {
    this.removeOut();
    this.moveCurrent();
    this.getFromBag();
  }

  start() {
    interval(500).subscribe(_ => {
      // console.log(this.difficultBag);
      this.step();
    });
  }
}
