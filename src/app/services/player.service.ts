import { Injectable } from '@angular/core';
import { PlayerPosition } from '../class/player-position';
import {fromEvent, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private subscription: Subscription;

  constructor(
    private position: PlayerPosition,
  ) {
  }

  public start() {
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
          this.position.up();
          break;
        case 'ArrowDown':
          this.position.down();
          break;
      }
    });
  }

  public stop() {
    this.subscription.unsubscribe();
  }

  public getLine() {
    return this.position.line;
  }
}
