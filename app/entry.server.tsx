import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { type AppLoadContext, type EntryContext, ServerRouter } from "react-router";

import logger from "~/utils/logger";

const REQUIRED_ENV_VARS = ["RESEND_API_KEY"] as const;
for (const key of REQUIRED_ENV_VARS) {
  if (!process.env[key]) {
    logger.warn({ event: "startup.missing_env", key });
  }
}

export const streamTimeout = 5000;

const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
const ABORT_DELAY_MS = 1000;

// eslint-disable-next-line max-params
export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        [callbackName]: () => {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set(
            "Content-Security-Policy",
            [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self'",
              "connect-src 'self'",
              "worker-src blob:",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
            ].join("; "),
          );
          responseHeaders.set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload",
          );
          responseHeaders.set("X-Frame-Options", "DENY");
          responseHeaders.set("X-Content-Type-Options", "nosniff");
          responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
          responseHeaders.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onError(error: unknown) {
          responseStatusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR;
          if (shellRendered) {
            console.error(error);
          }
        },
        onShellError(error: unknown) {
          reject(error);
        },
      },
    );

    setTimeout(abort, streamTimeout + ABORT_DELAY_MS);
  });
}
