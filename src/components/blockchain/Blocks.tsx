import { observer } from "mobx-react-lite";

import { useStore } from "src/store";

const Blocks = observer(() => {
  const store = useStore();

  return (
    <div>
      <h2>Blocks:</h2>
      <ul className="blocks">
        {[...store.blockchain.blocks].reverse().map((block) => (
          <li key={block.hash}>
            <h3>{block.hash}</h3>
            <pre>{JSON.stringify(block.transactions, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Blocks;
