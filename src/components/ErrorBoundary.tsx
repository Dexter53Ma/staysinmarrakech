"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  const t = useTranslations("error");
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
      <h2 className="text-xl font-bold text-[#34495e] mb-3">
        {t("title")}
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        {t("message")}
      </p>
      <button
        onClick={onRetry}
        className="bg-[#0d47a1] text-white px-6 py-2.5 rounded font-semibold hover:bg-[#0a3a82] transition-colors"
      >
        {t("retryBtn")}
      </button>
    </div>
  );
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
      return <ErrorFallback onRetry={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}
