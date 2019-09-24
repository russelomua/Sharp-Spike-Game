import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Board } from '../class/board';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  playerStyle: string = 'default';
  difficult: string = 'easy';

  constructor(
    public board: Board,
    public player: PlayerService,
    public game: GameService,
  ) {}
}
