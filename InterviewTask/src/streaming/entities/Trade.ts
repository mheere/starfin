import { Currency } from "./Currency";
import { Market } from "./Market";

export interface Trade {
  id: number,
  bookingDate: Date,
  market: Market,
  quantity: number,
  bookingPrice: number,
  currentPrice: number,
  profitAndLoss: number,
  currency: Currency
}
