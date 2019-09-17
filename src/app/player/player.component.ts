import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { PlayerPosition } from '../class/player-position';
import { Subscription, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PlayerService } from '../services/player.service';
import { Board } from '../class/board';
import { GameService } from '../services/game.service';
import { wrapGrid } from 'animate-css-grid';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {

  constructor(
    public board: Board,
    public player: PlayerService,
    public game: GameService,
  ) { }

  playerStyle: string = 'default';

  subscription: Subscription;

  ngOnInit() {
    const validKeys: string[] = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    const event = fromEvent<KeyboardEvent>(document, 'keydown')
                  .pipe(filter(
                    keyEvent => {
                      return validKeys.some(keyCode => keyEvent.key === keyCode);
                    }
                  ));

    this.subscription = event.subscribe((e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          this.player.moveUp();
          break;
        case 'ArrowDown':
          this.player.moveDown();
          break;
      }
    });

    const grid: HTMLElement = document.querySelector('.spikesHolder');
    wrapGrid(grid, {duration : 500, easing: 'linear'});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
