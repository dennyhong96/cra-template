import { makeAutoObservable } from "mobx";
import sha256 from "crypto-js/sha256";

import { RootStore } from "src/store";

interface IBlock {
  hash: string;
  transactions: string[];
}

class BlockchainStore {
  root: RootStore;

  blocks: IBlock[] = [];
  pendingTransactions: string[] = []; // pending transactions

  constructor(rootStore: RootStore) {
    this.root = rootStore;
    makeAutoObservable(this); // to auto-decorate data and actions
  }

  // computed property
  get numberBlocks() {
    return this.blocks.length;
  }

  get valid() {
    return this.blocks.every((block, index) => {
      const prevBlock = this.getPreviousBlock(index);
      const hash = this.getHash(prevBlock, block.transactions);
      return hash === block.hash;
    });
  }

  addTransaction(message: string) {
    this.pendingTransactions.push(message); // don't have to alter state immutably
  }

  getPreviousBlock(currentBlockIndex: number) {
    return this.blocks[currentBlockIndex - 1] ?? { hash: "" };
  }

  getHash(previousBlock: IBlock, transactions: string[]) {
    const hash = sha256(
      `${previousBlock.hash}${JSON.stringify(transactions)}`
    ).toString();

    return hash;
  }

  commitBlock(newBlock: IBlock) {
    console.log("Block written.");
    this.blocks.push(newBlock);
  }

  // write pending transactions into blockchain
  async writeBlock() {
    if (!this.pendingTransactions.length) return;
    console.log("Writing block...");

    const pendingTransactions = [...this.pendingTransactions];

    this.pendingTransactions = [];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const previousBlock = this.getPreviousBlock(this.blocks.length - 1);

    const hash = this.getHash(previousBlock, pendingTransactions);

    // Every step (tick) that updates observables in an asynchronous process should be marked as action
    // Any steps after await, or within Promise.then|Promise.catch, aren't in the same tick
    // there are 3 ways to wrap them in action

    // 1. Call another action on the class. - If the promise handlers are class fields,
    // they will automatically be wrapped in action by makeAutoObservable:
    this.commitBlock({ hash, transactions: pendingTransactions });

    // 2. Use runInAction to create a temporarily action that is immediately invoked.
    // runInAction(() => {
    //   console.log("Block written.");
    //   this.blocks.push({
    //     hash,
    //     transactions: pendingTransactions,
    //   });
    // });

    // 3. Use action higher order function
    // action("commitBlock", () => {
    //   console.log("Block written.");
    //   this.blocks.push({
    //     hash,
    //     transactions: pendingTransactions,
    //   });
    // })();
  }
}

export default BlockchainStore;
