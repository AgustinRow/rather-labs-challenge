import { tips_limit } from 'config';
let ORDER_BOOK = [];

const createBook = ({ pair }) => {
  ORDER_BOOK[pair] = {
    bids: [],
    asks: [],
  };
};

const getPair = ({ pair }) => ORDER_BOOK[pair];

const removeBidFromBook = ({ pair, tip }) => {
  const currentPair = getPair({ pair });
  //console.log(currentPair.bids)
  currentPair.bids = filterOrder(currentPair.bids, tip);
};
const removeAskFromBook = ({ pair, tip }) => {
  const currentPair = getPair({ pair });
  console.log('TIP: ', tip.PRICE)
  console.log('PREVIOUS REMOVING ASK')
  console.log(currentPair.asks)
  console.log('AFTER REMOVING ASK')
  let result= filterOrder(currentPair.asks, tip)
  console.log(result)
  currentPair.asks = result;
};

const addBidToBook = ({ pair, tip }) => {
  const currentPair = getPair({ pair });
  currentPair.bids.push({ tip });
  if (currentPair.bids.length > tips_limit)
    currentPair.bids = sliceElement(currentPair.bids);
};

const addAskToBook = ({ pair, tip }) => {
  const currentPair = getPair({ pair });
  currentPair.asks.push({ tip });
  if (currentPair.asks.length > tips_limit)
    currentPair.asks = sliceElement(currentPair.asks);
};

const sliceElement = (book) => book.slice(book.length - tips_limit);
const filterOrder = (book, tip) => book.filter((order) => {console.log(order);
  return order.PRICE !== tip.PRICE});

export default {
  createBook,
  getPair,
  addBidToBook,
  addAskToBook,
  removeBidFromBook,
  removeAskFromBook,
};
