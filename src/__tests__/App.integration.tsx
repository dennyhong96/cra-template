import userEvent from "@testing-library/user-event";

import { render, screen, waitForElementToBeRemoved } from "src/__tests__/testUtils";
import Home from "src/views/Home";

describe("Home page", () => {
  test("Should write a single transaction to a block", async () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const transactionMessage = "Hello";

    userEvent.clear(input);
    userEvent.type(input, transactionMessage);

    const addButton = screen.getByRole("button", { name: /Add/i });
    expect(addButton).toBeInTheDocument();

    userEvent.click(addButton);

    const pendingTransactionsHeading = screen.getByRole("heading", {
      level: 2,
      name: /Pending transactions:/i,
    });
    expect(pendingTransactionsHeading).toBeInTheDocument();

    const transactionItem = screen.getByText(transactionMessage);
    expect(transactionItem).toBeInTheDocument();
    expect(transactionItem.tagName).toBe("LI");
    await waitForElementToBeRemoved(transactionItem, {
      timeout: 10 * 1000,
    });

    const block = await screen.findByText((content) => content.includes(transactionMessage));
    expect(block).toBeInTheDocument();
    expect(block.tagName).toBe("PRE");
    expect(block.closest("li")).toBeInTheDocument();
  });

  test("Should write multiple transactions to a block", async () => {
    render(<Home />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: /Add/i });
    expect(addButton).toBeInTheDocument();

    const transactionMessages = ["Hello", "World", "Denny"];

    for (const transactionMessage of transactionMessages) {
      userEvent.type(input, transactionMessage);
      userEvent.click(addButton);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Wait for transactions to be written to block
    const pendingTransactionsHeading = screen.getByRole("heading", {
      level: 2,
      name: /Pending transactions:/i,
    });
    expect(pendingTransactionsHeading).toBeInTheDocument();
    await waitForElementToBeRemoved(pendingTransactionsHeading, {
      timeout: 10 * 1000,
    });

    for (const transactionMessage of transactionMessages) {
      const block = await screen.findByText((content) => content.includes(transactionMessage));
      expect(block).toBeInTheDocument();
      expect(block.tagName).toBe("PRE");
      expect(block.closest("li")).toBeInTheDocument();
    }
  });
});
