// Implement the function calculateSummary below such that it returns a summary
// object that contains the sum of all the balances of the passed in items.
// Note that balance and pendingTransactions are optional. Rows where 
// balance is not provided should not contribute to the summary, and
// rows where pendingTransactions is not provided should not affect the summary's
// pendingTransactions. 20 mins

interface Item {
  balance?: {
    current: number,
    pendingTransactions?: number,
    credit: number
  }
}

interface Summary {
  current: number,
  pendingTransactions: number,
  credit: number
}

function calculateSummary(items: Item[]): Summary {
  return items.reduce((acc: Summary, item: Item) => {

    // if no balance given, then return the acc directly
    if (!item.balance) return acc;

    // add the props and ensure to deal with the nullable pendingTransactions
    const bal = item.balance;
    acc.current += bal.current;
    acc.pendingTransactions += bal.pendingTransactions ? bal.pendingTransactions : 0;
    acc.credit += bal.credit;

    // 
    return acc;

  }, { current: 0, pendingTransactions: 0, credit: 0 })
}

export const test2 = () => {

  let items: Item[] = [];
  items.push({ balance: { current: 100, pendingTransactions: 2, credit: 10 } });
  items.push({ balance: { current: 150, pendingTransactions: 3, credit: 20 } });
  items.push({ balance: null });
  items.push({ balance: { current: 200, pendingTransactions: null, credit: 20 } });
  items.push({ balance: { current: 150, pendingTransactions: 4, credit: 50 } });
  const res = calculateSummary(items);

  console.log("Answer Task2:", res);
  //debugger;

}
