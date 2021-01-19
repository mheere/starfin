import React, { useReducer } from 'react';
import './App.css';
import 'fontsource-roboto';
import { OpenTradesGrid } from './OpenTradesGrid';
import { Trade } from './streaming/entities/Trade';
import { MockStreamingConnection } from './streaming/mock/MockStreamingConnection';
import { StreamUpdate } from './streaming/StreamUpdate';
import { StreamUpdateType } from './streaming/StreamUpdateType';

const trades: Trade[] = [
  {
    id: 1,
    bookingDate: new Date(2020, 8, 10, 10, 43, 22),
    market: {
      id: 1,
      name: "GBP/USD",
      quantityDecimalPlaces: 2,
      priceDecimalPlaces: 5
    },
    quantity: 10,
    bookingPrice: 1.23531,
    currentPrice: 1.23452,
    profitAndLoss: 4.23,
    currency: {
      id: 1,
      code: "GBP"
    }
  },
  {
    id: 43,
    bookingDate: new Date(2020, 8, 9, 16, 10, 49),
    market: {
      id: 243,
      name: "EUR/USD",
      quantityDecimalPlaces: 2,
      priceDecimalPlaces: 5
    },
    quantity: 17.5400,
    bookingPrice: 1.17487,
    currentPrice: 1.17417,
    profitAndLoss: -7.451,
    currency: {
      id: 1,
      code: "GBP"
    }
  },
  {
    id: 64574,
    bookingDate: new Date(2020, 8, 11, 13, 1, 5),
    market: {
      id: 1,
      name: "GBP/USD",
      quantityDecimalPlaces: 2,
      priceDecimalPlaces: 5
    },
    quantity: 4.5,
    bookingPrice: 1.23741,
    currentPrice: 1.23452,
    profitAndLoss: -2.1474101,
    currency: {
      id: 1,
      code: "GBP"
    }
  }
];

function App() {

  const initialState = { trades: [] };

  function reducer(state: any, action: StreamUpdate<Trade>) {

    let newTrade: Trade = action.update;
    let newState = { ...state };

    switch (action.type) {
      case StreamUpdateType.Add:
        newState.trades.push(action.update);
        break;

      case StreamUpdateType.Delete:
        newState = newState.trades.filter((trade: Trade) => trade.id !== newTrade.id);
        break;

      case StreamUpdateType.Update:
        {
          let index = newState.trades.findIndex((trade: Trade) => trade.id === newTrade.id);
          if (index > -1) {
            newState.trades.splice(index, 1, newTrade);
          }
        }
        break;

      default:
        throw new Error();
    }

    return newState
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  let update = (data: Array<StreamUpdate<Trade>>) => {
    console.log(data);
    data.forEach((item: StreamUpdate<Trade>) => {
      //dispatch(item);
      console.log(item);
    })
  }


  let conn = new MockStreamingConnection();
  conn.connect();
  let stream = conn.getTradesStream();
  stream.onUpdate = update;

  const start = () => {
    stream.start();
  }

  const stop = () => {
    stream.stop();
  }

  return (
    <div className="App">
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <OpenTradesGrid trades={state.trades} />
    </div>
  );
}

export default App;
