import { FC } from "react";
import { Link } from "react-router-dom";

import Transactions from "src/components/blockchain/Transactions";
import AddTransactionForm from "src/components/blockchain/AddTransactionForm";
import Title from "src/components/blockchain/Title";
import Blocks from "src/components/blockchain/Blocks";

const HomeView: FC = () => {
  return (
    <main>
      <Link to="/notes">Go to notes</Link>
      <Title />
      <AddTransactionForm />
      <Transactions />
      <Blocks />
    </main>
  );
};

export default HomeView;
