export class Difficult {
  number: number;

  constructor(index: number, template: number[]) {
    this.number = template[index-1];
  }
}
