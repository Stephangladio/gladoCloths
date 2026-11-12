
import { Component } from "react";

import type { ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("GLADO application error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
                    <h1 className="text-3xl font-semibold">
                        Something went wrong
                    </h1>

                    <p className="text-sm text-gray-500 mt-3">
                        Please refresh the page and try again.
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 bg-black text-white px-8 py-3 text-sm"
                    >
                        REFRESH PAGE
                    </button>
                </main>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;