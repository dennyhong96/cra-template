import { createContext, useContext, useEffect, FC } from "react";

import BlockchainStore from "src/store/modules/BlockchainStore";
import NoteStore from "src/store/modules/NoteStore";

// RootStore Pattern https://dev.to/ivandotv/mobx-root-store-pattern-with-react-hooks-318d
class RootStore {
  blockchain: BlockchainStore;
  noteStore: NoteStore;

  constructor() {
    this.blockchain = new BlockchainStore(this);
    this.noteStore = new NoteStore(this);
  }
}

const StoreContext = createContext<RootStore>(new RootStore()); // Instantiate BlockchainStore just to make TS happy

const StoreProvider: FC<{ store: RootStore }> = ({ store, children }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      store.blockchain.writeBlock();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [store]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};

export { RootStore, StoreProvider, useStore };
