"use client";

import { useEffect, useState } from "react";

export function usePollingJson<T>(url: string, initial: T, intervalMs = 12000) {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { cache: "no-store" });
        const json = await response.json();
        if (active) {
          setData(json);
        }
      } catch {
        if (active) {
          setData(initial);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchData();
    const timer = setInterval(fetchData, intervalMs);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [url, intervalMs, initial]);

  return { data, loading };
}
