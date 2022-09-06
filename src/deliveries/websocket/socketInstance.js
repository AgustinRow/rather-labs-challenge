import ws from 'ws';
import { provider } from 'config';
import { socketHandlerMessage } from './helper';

const socketInstance = ({ pair }) => {
  console.log('PROVIDER:', provider, 'CURRENCY:', pair);
  const socket = new ws(provider);
  socket.on('open', () => {
    console.log(`Socket open to: ${pair}`);
    const subscription = JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      freq: 'F1',
      pair,
      prec: 'P0',
    });

    socket.send(subscription);
  });

  socket.on('message', (message) => {
    socketHandlerMessage({ message, pair });
  });
};

export default socketInstance;
