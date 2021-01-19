import { Currency } from "../entities/Currency";
import { Market } from "../entities/Market";
import { Trade } from "../entities/Trade";
import { StreamUpdate } from "../StreamUpdate";
import { StreamUpdateType } from "../StreamUpdateType";
import { MockStream } from "./MockStream";

export class MockTradeStream extends MockStream<Trade> {
  private source: TradeStreamSource; 
  
  constructor() {
    super();

    this.source = new TradeStreamSource();
  }

  protected generateUpdates(): StreamUpdate<Trade>[] {
    const tradeUpdates = this.source.generateTradeUpdates();
    return tradeUpdates;
  }
}

class TradeStreamSource {
  private readonly markets: Market[] = [
    {
      id: 34232,
      name: "GBP/USD",
      quantityDecimalPlaces: 2,
      priceDecimalPlaces: 5
    },
    {
      id: 45363,
      name: "EUR/USD",
      quantityDecimalPlaces: 2,
      priceDecimalPlaces: 5
    }
  ];
  private readonly currencies: Currency[] = [
    {
      id: 1,
      code: "GBP"
    },
    {
      id: 2,
      code: "EUR"
    },
    {
      id: 3,
      code: "USD"
    }
  ];
  private trades: Map<number, Trade> | undefined;
  private nextTradeId: number = 1;

  public generateTradeUpdates(): StreamUpdate<Trade>[] {
    if (this.trades === undefined) {
      this.trades = this.generateStartingTrades();
      return Array.from(this.trades.values()).map(x => ({ update: {...x}, type: StreamUpdateType.Add }));
    }

    const shouldDeleteOldTrade = this.trades.size > 2 && Math.random() >= 0.9;
    const tradeToDelete: Trade | undefined = shouldDeleteOldTrade
      ? Array.from(this.trades.values())[Math.floor(Math.random() * this.trades.size)]
      : undefined;
      
    const shouldAddNewTrade = this.trades.size < 10 && Math.random() >= 0.9;
    const tradeToAdd: Trade | undefined = shouldAddNewTrade
      ? this.generateTrade()
      : undefined;

    const updatedTrades = Array.from(this.trades.values())
      .filter(x => x.id !== tradeToDelete?.id && Math.random() >= 0.6)
      .map(x => {
        const currentPrice = this.generateCurrentPrice(x.currentPrice);
        return {
          ...x, 
          currentPrice,
          profitAndLoss: this.calculateProfitAndLoss(x.bookingPrice, x.currentPrice)
        }
      });
    
    const tradeUpdates = new Array<StreamUpdate<Trade>>();
    updatedTrades.forEach(x => {
      this.trades?.set(x.id, x);
      tradeUpdates.push({ update: x, type: StreamUpdateType.Update});
    });
    if (tradeToDelete !== undefined) {
      this.trades.delete(tradeToDelete.id);
      tradeUpdates.push({ update: tradeToDelete, type: StreamUpdateType.Delete })
    }
    if (tradeToAdd !== undefined) {
      this.trades.set(tradeToAdd.id, tradeToAdd);
      tradeUpdates.push({ update: tradeToAdd, type: StreamUpdateType.Add });
    }

    return tradeUpdates;
  }

  private generateTrade(): Trade {
    const id = this.nextTradeId;
    this.nextTradeId++;

    const bookingPrice = Math.random() * 1.5;
    const currentPrice = this.generateCurrentPrice(bookingPrice);
    const profitAndLoss = this.calculateProfitAndLoss(bookingPrice, currentPrice);
    return {
      id,
      bookingDate: new Date(),
      market: this.markets[Math.floor(Math.random() * this.markets.length)],
      quantity: Math.random() * 10 * (Math.random() >= 0.5 ? 1 : -1),
      bookingPrice,
      currentPrice,
      profitAndLoss,
      currency: this.currencies[Math.floor(Math.random() * this.currencies.length)]
    };
  }

  private generateCurrentPrice(previousPrice: number): number {
    const priceDifference = ((Math.random() / 10) * Math.random() >= 0.5 ? 1 : -1);
    const currentPrice = previousPrice + priceDifference;
    if (currentPrice < 0) {
      return currentPrice * -1;
    }
    if (currentPrice === 0) {
      return 0.1;
    }
    return currentPrice;
  }

  private calculateProfitAndLoss(bookingPrice: number, currentPrice: number): number {
    const profitAndLoss = Math.random() * bookingPrice > currentPrice ? -1 : 1;
    return profitAndLoss;
  }

  private generateStartingTrades(): Map<number, Trade> {
    const maxStartingCount = 5;
    const startingCount = Math.ceil(Math.random() * maxStartingCount);

    return new Map<number, Trade>(Array
      .from(new Array(startingCount).keys())
      .map(x => [x, this.generateTrade()]));
  }
}
