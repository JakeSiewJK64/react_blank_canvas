/// <reference types="vite/client" />
import * as Sentry from "@sentry/react";
import LogRocket from "logrocket";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PostHogProvider } from "posthog-js/react";
import { ToastProvider } from "./components/Toast/index.js";
import { ModalProvider } from "./components/Modal/index.js";
import App from "./App.js";
import "./index.css";
import "./App.css";

const REACT_APP_PUBLIC_POSTHOG_KEY = import.meta.env
  .VITE_REACT_APP_PUBLIC_POSTHOG_KEY;

const options = {};

LogRocket.init(import.meta.env.VITE_LOGROCKET_API_KEY);

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <PostHogProvider apiKey={REACT_APP_PUBLIC_POSTHOG_KEY} options={options}>
        <ModalProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ModalProvider>
      </PostHogProvider>
    </StrictMode>
  );
}
