import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Board {
  public lines: number = 5;
  public cols: number = 8;

  public difficultTemplates = {
    easy: [2, 1, 0, 0, 0, 0, 0],
    normal: [2, 1, 1, 0, 0, 0, 0],
    hard: [2, 1, 1, 1, 0, 0],
    hell: [2, 2, 1, 1, 1, 1, 0, 0, 0],
  };
}
