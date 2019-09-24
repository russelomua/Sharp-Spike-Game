export class Bag<T> {
  private bag: T[] = [];
  private readonly type: any;
  private readonly size: any;
  private readonly args: any[];

  constructor(type: any, size: number, ...args: any) {
    this.type = type;
    this.size = size;
    this.args = args;
  }

  private factory(type: new (...args: any) => T, ...args: any): T {
    return new type(...args);
  }

  private fillBag() {
    for (let i = 1; i <= this.size; i++) {
      this.bag.push(this.factory(this.type, i, ...this.args));
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
