import { FxRate } from "../entities/FxRate";
import { StreamUpdate } from "../StreamUpdate";
import { StreamUpdateType } from "../StreamUpdateType";
import { MockStream } from "./MockStream";

export class MockFxRateStream extends MockStream<FxRate> {
  private readonly baseCurrencyId: number;
  private readonly deliveryCurrencyId: number;
  private lastRate: number | undefined;

  constructor(baseCurrencyId: number, deliveryCurrencyId: number) {
    super();

    this.baseCurrencyId = baseCurrencyId;
    this.deliveryCurrencyId = deliveryCurrencyId;
  }

  protected generateUpdates(): StreamUpdate<FxRate>[] {
    const streamUpdateType = this.lastRate === undefined
      ? StreamUpdateType.Add
      : StreamUpdateType.Update;

    const newRate = this.lastRate === undefined 
      ? Math.random() * 1.5
      : this.generateNewRate(this.lastRate);
    this.lastRate = newRate;

    return [{ 
      update: {
        baseCurrencyId: this.baseCurrencyId,
        deliveryCurrencyId: this.deliveryCurrencyId,
        rate: newRate
      },
      type: streamUpdateType
    }];
  }

  private generateNewRate(oldRate: number): number {
    const rateDifference = ((Math.random() / 100) * (Math.random() >= 0.5 ? 1 : -1));
    const currentRate = oldRate + rateDifference;
    if (currentRate < 0) {
      return currentRate * -1;
    }
    if (currentRate === 0) {
      return 0.1;
    }
    return currentRate;
  }
}