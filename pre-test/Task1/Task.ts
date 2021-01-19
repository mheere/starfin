// Implement the function groupByDate below such that it groups the 
// passed in items by date (only by date, NOT by date and time) into a data structure which 
// provides efficent access to items by date, and returns that data structure.
// Note, the dateAndTime property is optional; any items without a dateAndTime
// should also be grouped together.

interface Item {
  id: number,
  dateAndTime?: Date,
  name: string
}

interface GroupResult {
  items: GroupResultItems[]
}

interface GroupResultItems {
  items: Item[]
}

function convertToDate(datum?: Date): string {
  if (!datum) return "nodate";
  return `${datum.getFullYear()}-${datum.getMonth()}-${datum.getDate()}`;
}

function groupByDate(items: Item[]): any {

  return items.reduce((acc: any, item: Item) => {

    // get a date only string (so we can group on it)
    const mydate = convertToDate(item.dateAndTime);

    // if this date is not yet known, create a new array that holds items on that date
    if (!(mydate in acc)) acc[mydate] = [];

    // hang on to the item
    acc[mydate].push(item);

    // return the accumulator
    return acc;
  }, {})
}

export const test1 = () => {

  let items: Item[] = [];
  items.push({ id: 1, dateAndTime: new Date(1995, 11, 17, 3, 24, 0), name: 'option 1' });
  items.push({ id: 2, dateAndTime: null, name: 'option 2' });
  items.push({ id: 6, dateAndTime: new Date(1995, 11, 18), name: 'option 6' });
  items.push({ id: 3, dateAndTime: new Date(1995, 11, 17, 3, 22, 0), name: 'option 3' });
  items.push({ id: 4, dateAndTime: null, name: 'option 4' });
  items.push({ id: 5, dateAndTime: new Date(1995, 11, 18), name: 'option 5' });
  items.push({ id: 6, dateAndTime: new Date(1995, 11, 18), name: 'option 6' });
  const res: GroupResult = groupByDate(items);

  console.log("Answer Task1:", res);
  //debugger;

}
