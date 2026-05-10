import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>,
    );
  });
}

if (globalThis.requestIdleCallback) {
  globalThis.requestIdleCallback(hydrate);
} else {
  globalThis.setTimeout(hydrate, 1);
}
