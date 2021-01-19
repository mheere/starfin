import { FxRate } from "./entities/FxRate";
import { Trade } from "./entities/Trade";
import { Stream } from "./Stream";

export interface StreamingConnection {
  connect(): void,
  disconnect(): void,
  getTradesStream(): Stream<Trade>,
  getFxRateStream(baseCurrencyId: number, deliveryCurrencyId: number): Stream<FxRate>
}