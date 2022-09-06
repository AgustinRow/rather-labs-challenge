import orderBook from '../../../services/store';

const addTipOnOrderBook = ({ tip, pair }) => {
   if (tip.AMOUNT > 0) {
    orderBook.addBidToBook({ pair, tip });
  } else {
    orderBook.addAskToBook({ pair, tip });
  }
};

const removeTipFromOrderBook = ({ tip, pair }) => {
  if (tip.AMOUNT === 1) {
    orderBook.removeBidFromBook({ pair, tip });
  }
  if (tip.AMOUNT === -1) {
    orderBook.removeAskFromBook({ pair, tip });
  }
};

const bidAskHandler = ({ pair, tip }) => {
  if (tip.COUNT > 0) addTipOnOrderBook({ tip, pair });
  if (tip.COUNT === 0) removeTipFromOrderBook({ tip, pair });
};



export default bidAskHandler;
