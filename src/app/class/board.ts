import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Board {
  public lines: number = 5;
  public cols: number = 8;
}
