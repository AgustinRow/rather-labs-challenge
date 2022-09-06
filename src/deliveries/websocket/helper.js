import orderBook from '../../services/store';
import bidAskHandler from './bidAsk';

const isAValidOrder = (tip) =>
  Array.isArray(tip) &&
  tip.length === 3 &&
  typeof tip[0] === 'number' &&
  typeof tip[1] === 'number' &&
  typeof tip[2] === 'number';

const isBookValid = ({ payload }) => {
  if (
    !(
      Array.isArray(payload) &&
      payload.length === 2 &&
      Array.isArray(payload[1])
    )
  ) {
    console.log('Bad format from book');
    return false;
  }
  const tip = payload[1];
  if (!(isAValidOrder(tip) || tip.every((e) => isAValidOrder(e)))) {
    console.log('Incorrect format on tips');
    return false;
  }
  return true;
};

const destructureTip = ({ tip }) => ({
  PRICE: tip[0],
  COUNT: tip[1],
  AMOUNT: tip[2],
});

const parseTip = ({ tip }) =>
  isAValidOrder(tip)
    ? [destructureTip({ tip })]
    : tip.map((element) => destructureTip(element));

const parseOrder = ({ pair, order }) => ({
  pair,
  chanelId: order[0],
  tips: parseTip({ tip: order[1] }),
});

const resgisterOrder = ({ order }) => {
  const { pair, tips } = order;
  const isPairInBook = orderBook.getPair({ pair });
  if (!isPairInBook) {
    console.log(`${pair} not found in book`);
    return;
  }
  tips.forEach((tip) =>
    bidAskHandler({
      pair,
      tip,
    }),
  );
};

const socketHandlerMessage = ({ message, pair }) => {
  try {
    const payload = JSON.parse(message.toString());
    if (isBookValid({ payload })) {
      const parsedOrder = parseOrder({ pair, order: payload });
      resgisterOrder({ order: parsedOrder });
    } else {
      console.log(`invalid ${pair} format `);
    }
  } catch (error) {
    console.log('Error: ', error.message);
  }
};

export { socketHandlerMessage };
