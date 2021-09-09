import { setupServer } from "msw/node";

import { handlers } from "src/__tests__/mocks/handlers";

export const server = setupServer(...handlers);
