import { FxRate } from "../entities/FxRate";
import { Trade } from "../entities/Trade";
import { Stream } from "../Stream";
import { StreamingConnection } from "../StreamingConnection";
import { MockFxRateStream } from "./MockFxRateStream";
import { MockTradeStream } from "./MockTradeStream";

export class MockStreamingConnection implements StreamingConnection {
  private isConnected: boolean;

  constructor() {
    this.isConnected = false;
  }

  connect(): void {
    if (this.isConnected) {
      throw new Error("Connection already established");
    }

    this.isConnected = true;
  }

  disconnect(): void {
    if (!this.isConnected) {
      throw new Error("Connection not established; cannot disconnect");
    }

    this.isConnected = false;
  }

  getTradesStream(): Stream<Trade> {
    if (!this.isConnected) {
      throw new Error("Connection not established; cannot stream trades");
    }

    return new MockTradeStream();
  }

  getFxRateStream(baseCurrencyId: number, deliveryCurrencyId: number): Stream<FxRate> {
    if (!this.isConnected) {
      throw new Error("Connection not established; cannot stream FX rates");
    }

    return new MockFxRateStream(baseCurrencyId, deliveryCurrencyId);
  }
}