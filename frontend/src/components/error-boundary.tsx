import { Component } from "react";
import { logError } from "lib/error-lib";

export default class ErrorBoundary extends Component<any, any> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    logError(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <div className="ErrorBoundary text-center">
        <h3>Sorry there was a problem loading this page</h3>
      </div>
    ) : (
      this.props.children
    );
  }
}
