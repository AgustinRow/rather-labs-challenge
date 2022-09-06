import { tips_limit } from 'config';

export class OrderBook {
    constructor() {
      this.tip;
    }
    pushTipToBook({ tip }) {
      this.tip.push({ tip });
      if (this.tip.length > tips_limit) this.tip = this.sliceOrder();
    }
    removeTipFromBook({ tip }) {
      this.tip = this.filterOrder(tip);
    }
    sliceOrder() {
      return this.tip.slice(this.tip.length - tips_limit);
    }
    filterOrder(tip) {
      return this.tip.filter((order) => order !== tip);
    }
}
  
export class Bid extends OrderBook {
    constructor({ pair }) {
      super({ pair });
      this.tip = []
    }
  }
  
export class Ask extends OrderBook {
    constructor({ pair }) {
      super({ pair });
      this.tip = []
    }
  }

