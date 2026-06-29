"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
          <h2 className="text-xl font-bold text-[#34495e] mb-3">
            Une erreur est survenue
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Nous nous excusons pour ce désagrément. Veuillez réessayer.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-[#0d47a1] text-white px-6 py-2.5 rounded font-semibold hover:bg-[#0a3a82] transition-colors"
          >
            Réessayer
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
