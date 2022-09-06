import { currencies } from 'config';
import socketInstance from './socketInstance';
import orderBook from '../../services/store';
require('dotenv').config;

const createSocket = () => {
  currencies.forEach((pair) => {
    console.log(`Creating book pair: ${pair}`);
    orderBook.createBook({pair})
    console.log(`Registering to socket with pair: ${pair}`);
    socketInstance({ pair });
  });
};

export default createSocket;
