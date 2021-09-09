import { FormEvent, useState } from "react";

import { useStore } from "src/store";

// Don't need to wrap in oberver if don't need to react to state changes, e.g. only accessing actions
const AddTransactionForm = () => {
  const store = useStore();
  const [message, setMessage] = useState("");

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    store.blockchain.addTransaction(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        required
        placeholder="Message"
        value={message}
        onChange={(evt) => setMessage(evt.target.value)}
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
