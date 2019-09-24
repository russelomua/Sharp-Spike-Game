export class Score {
  private value: number = 0;

  public get() {
    return this.value;
  }

  public increase(value) {
    this.value = this.value + value;
  }
}
