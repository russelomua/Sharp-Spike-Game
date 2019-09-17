import { Injectable } from '@angular/core';
import { Spike } from '../class/spike';
import { Bag } from '../class/bag';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public spikes: Spike[] = [];
  public spikesPerColumn = 1;

  constructor(private bag: Bag) {
    this.start();
  }

  getFromBag() {
    for (let i = 0; i < this.spikesPerColumn; i++) {
      this.spikes.push(this.bag.getRandom());
    }
  }

  moveCurrent() {
    this.spikes.forEach(spike => {
      spike.stepUp();
    });
  }

  removeOut() {
    this.spikes = this.spikes.filter(spike => !spike.isZeroPosition());
  }

  step() {
    this.removeOut();
    this.moveCurrent();
    this.getFromBag();
  }

  start() {
    interval(500).subscribe(_ => {
      console.log('123');
      this.step();
    });
  }
}
