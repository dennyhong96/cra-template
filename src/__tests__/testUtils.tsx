import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

import { RootStore, StoreProvider } from "src/store";
import { MemoryRouter } from "react-router-dom";

const Providers: FC = ({ children }) => {
  const store = new RootStore();

  return (
    <MemoryRouter>
      <StoreProvider store={store}>{children}</StoreProvider>
    </MemoryRouter>
  );
};

const customRender = (ui: ReactElement, options: Partial<RenderOptions> = {}) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { customRender as render };
