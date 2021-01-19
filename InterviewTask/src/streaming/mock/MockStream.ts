import { Stream } from "../Stream";
import { StreamUpdate } from "../StreamUpdate";

export abstract class MockStream<T> implements Stream<T> {
  private isStarted: boolean;
  private timeoutId: number | undefined;

  public onUpdate: ((updates: StreamUpdate<T>[]) => void) | undefined;

  constructor() {
    this.isStarted = false;
  }

  start(): void {
    if (this.isStarted) {
      throw new Error("Stream already started");
    }

    this.isStarted = true;

    this.startUpdates();
  }

  stop(): void {
    if (!this.isStarted) {
      throw new Error("Stream not started; cannot stop stream");
    }

    this.stopUpdates();
  }

  private startUpdates(): void {
    this.timeoutId = window.setTimeout(() => {
      this.generateAndSendUpdates();
    }, this.generateUpdateDelay());
  }

  private stopUpdates(): void {
    if (this.timeoutId === undefined) {
      return;
    }

    window.clearTimeout(this.timeoutId);
  }

  private generateAndSendUpdates(): void {
    const updates = this.generateUpdates();
    this.sendUpdates(updates);

    this.timeoutId = window.setTimeout(() => {
      this.generateAndSendUpdates();
    }, this.generateUpdateDelay());
  }

  protected abstract generateUpdates(): StreamUpdate<T>[];

  private sendUpdates(updates: StreamUpdate<T>[]): void {
    if (this.onUpdate !== undefined && updates.length > 0) {
      this.onUpdate(updates);
    }
  }

  private generateUpdateDelay(): number {
    const updateDelay = Math.random() * 2000;
    return Math.max(updateDelay, 250);
  }
}