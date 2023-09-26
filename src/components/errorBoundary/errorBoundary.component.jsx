import * as React from "react";
import { logout } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    if (error.message === "401") {
      localStorage.removeItem("accessToken");

      return window.location.replace("/signin");
    }

    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    //logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
