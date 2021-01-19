import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Trade } from "./streaming/entities/Trade";

export interface Props {
  trades: Trade[]
}

export function OpenTradesGrid(props: Props) {

  // const quantityDecimalPlaces = (x: any) => {
  //   return x.toFixed(2);
  // }

  // const formatNumber = (trade: Trade, col: string) => {
  //   let f = trade.market;

  //   return trade[col].toFixed(2);
  //   //return x.toFixed(2);
  // }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking Date</TableCell>
            <TableCell>Market</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Booking Price</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Profit &amp; Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{trade.bookingDate.toLocaleString()}</TableCell>
              <TableCell>{trade.market.name}</TableCell>
              <TableCell align="right">{trade.quantity}</TableCell>
              <TableCell align="right">{trade.bookingPrice}</TableCell>
              <TableCell align="right">{trade.currentPrice}</TableCell>
              <TableCell align="right">{trade.profitAndLoss}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
