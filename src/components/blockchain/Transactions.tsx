import { FC } from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "src/store";

// observer makes state reactive, only re-render when the pieces of state
const Transactions: FC = observer(() => {
  const store = useStore();

  return store.blockchain.pendingTransactions.length ? (
    <div>
      <h2>Pending transactions:</h2>
      <ul className="pending">
        {store.blockchain.pendingTransactions.map((transaction, idx) => (
          <li key={`${transaction}-${idx}`}>{transaction}</li>
        ))}
      </ul>
    </div>
  ) : null;
});

export default Transactions;
