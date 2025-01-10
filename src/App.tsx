/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Component, ErrorInfo, ReactNode, useEffect } from "react";
import { posthog } from "posthog-js";

const CustomErrorPage = () => {
  return <div>i am custom error page</div>;
};

const PosthogPageViewTracker = () => {
  let location = useLocation();

  // Track pageviews
  useEffect(() => {
    if (posthog) {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
      });
    }
  }, [location]);

  return null;
};

type State = {
  hasError: boolean;
  errorInfo: ErrorInfo | null;
  error: Error | null;
  customErrorPage: ReactNode;
};

type Props = {
  children?: ReactNode;
  customErrorPage?: ReactNode;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { customErrorPage } = props;

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      customErrorPage,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { customErrorPage, hasError } = this.state;

    if (hasError) {
      if (customErrorPage) {
        return <>{customErrorPage}</>;
      }

      return (
        <div
          style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              border: "solid 1px lightgray",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <h1>Something went wrong.</h1>
            {this.state.error && (
              <details style={{ whiteSpace: "pre-wrap" }}>
                <p>{this.state.error.toString()}</p>
                <br />
                <p>{this.state.errorInfo?.componentStack}</p>
              </details>
            )}
          </div>
        </div>
      );
    }

    // Render children if no error
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <PosthogPageViewTracker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
