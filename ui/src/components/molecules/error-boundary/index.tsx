import { Component } from "react";
import type {
  TErrorBoundaryProps,
  TErrorBoundaryState,
} from "./error-boundary.type";
import { WarningIcon } from "../../atoms/icons/warning-icon";
import { ErrorIcon } from "../../atoms/icons/error-icon";
import { InfoIcon } from "../../atoms/icons/info-icon";
import { ReloadIcon } from "../../atoms/icons/reload-icon";
import { HomeIcon } from "../../atoms/icons/home-icon";

class ErrorBoundary extends Component<
  TErrorBoundaryProps,
  TErrorBoundaryState
> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): TErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by boundary:", error);
  }

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {/* Animated Error Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-orange-400 rounded-full p-8 shadow-xl">
                  <WarningIcon
                    size={80}
                    className="text-white animate-bounce"
                  />
                </div>
              </div>
            </div>

            {/* Error Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-orange-400 p-6 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Oops! Something went wrong
                </h1>
                <p className="text-primary-50 text-sm">
                  Don't worry, it's not your fault
                </p>
              </div>

              {/* Error Details */}
              <div className="p-8 space-y-6">
                {/* Error Message Box */}
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <ErrorIcon
                      size={24}
                      className="text-red-500 flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-red-800 mb-1">
                        Error Details
                      </h3>
                      <p className="text-sm text-red-700 font-mono break-words leading-relaxed">
                        {this.state.error?.message ||
                          "An unexpected error occurred"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Helpful Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <InfoIcon size={20} />
                    What you can try:
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1 ml-7">
                    <li>• Reload the page to start fresh</li>
                    <li>• Go back to the home page</li>
                    <li>• Clear your browser cache</li>
                    <li>• Try again in a few moments</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={this.handleReload}
                    className="flex-1 group px-6 py-3 bg-orange-400 text-white font-semibold rounded-xl hover:bg-primary-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ReloadIcon
                        size={20}
                        className="group-hover:rotate-180 transition-transform duration-500"
                      />
                      Reload Page
                    </span>
                  </button>

                  <button
                    onClick={this.handleGoHome}
                    className="flex-1 group px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <HomeIcon
                        size={20}
                        className="group-hover:scale-110 transition-transform"
                      />
                      Go to Home
                    </span>
                  </button>
                </div>

                {/* Support Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Need help?{" "}
                    <a
                      href="mailto:datdoan.dev@gmail.com"
                      className="text-primary-600 hover:text-primary-800 font-medium hover:underline transition-colors"
                    >
                      Contact Support →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
