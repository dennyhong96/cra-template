import { observer } from "mobx-react-lite";

import { useStore } from "src/store";

const Title = observer(() => {
  const store = useStore();

  return (
    <h1>
      {store.blockchain.numberBlocks} Blocks (
      {store.blockchain.valid ? "Valid" : "Invalid"})
    </h1>
  );
});

export default Title;
