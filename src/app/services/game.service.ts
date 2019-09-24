import { Injectable } from '@angular/core';
import { Spike } from '../class/spike';
import { Bag } from '../class/bag';
import {interval, Subscription} from 'rxjs';
import { Board } from '../class/board';
import { Difficult } from '../class/dificult';
import {PlayerService} from './player.service';
import {Score} from '../class/score';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameRun: boolean = false;
  public difficult: string;
  public score: Score;

  public spikes: Set<Spike>;

  private spikesBag: Bag<Spike>;
  private difficultBag: Bag<Difficult>;

  private gameSubscription: Subscription;

  constructor(
    public board: Board,
    public player: PlayerService,
  ) {}

  getFromBag() {
    const difficult = this.difficultBag.getRandom();

    if (difficult.number === 0) {
      return;
    }

    for (let i = 0; i < difficult.number; i++) {
      this.spikes.add(this.spikesBag.getRandom());
    }
  }

  moveCurrent() {
    this.spikes.forEach(spike => {
      spike.stepUp();
    });
  }

  removeOut() {
    this.spikes.forEach(spike => {
      if (spike.isZeroPosition()) {
        this.spikes.delete(spike);
        this.score.increase(spike.getCost());
      }
    });
  }

  endGameCheck() {
    for (const spike of this.spikes.values()) {
      if (spike.isZeroPosition() && this.player.getLine() === spike.line) {
        this.stop();
        break;
      }
    }
  }

  step() {
    this.endGameCheck();
    this.removeOut();
    this.moveCurrent();
    this.getFromBag();
  }

  init(difficult = 'easy') {
    this.difficult = difficult;
    this.spikesBag = new Bag<Spike>(
      Spike,
      this.board.lines,
      this.board.cols
    );

    const presetTemplate = this.board.getPresetTemplate(this.difficult);

    this.difficultBag = new Bag<Difficult>(
      Difficult,
      presetTemplate.length,
      presetTemplate
    );

    this.score = new Score();
    this.spikes = new Set();
  }

  start(difficult) {
    this.init(difficult);
    this.player.start();
    this.gameRun = true;

    const speed = this.board.getPresetSpeed(difficult);

    this.gameSubscription = interval(speed).subscribe(_ => {
      this.step();
    });
  }

  stop() {
    this.gameRun = false;
    this.player.stop();
    this.gameSubscription.unsubscribe();
    this.spikes.clear();
  }
}
