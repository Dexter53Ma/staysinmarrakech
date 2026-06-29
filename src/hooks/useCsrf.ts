"use client";

import { useState, useEffect, useCallback } from "react";

export function useCsrf() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/csrf")
      .then((r) => r.json())
      .then((data) => setToken(data.csrfToken))
      .catch(() => {});
  }, []);

  const csrfFetch = useCallback(
    (url: string, init?: RequestInit): Promise<Response> => {
      const headers = new Headers(init?.headers);
      if (token) {
        headers.set("X-CSRF-Token", token);
      }
      return fetch(url, { ...init, headers });
    },
    [token]
  );

  return { token, csrfFetch };
}
