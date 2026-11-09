export type Log = (level: "info" | "warn" | "error", message: string, data: object) => void;

/** POSTs once, retries once on a non-2xx answer or a network error, and logs every attempt. */
export const postWithRetry = async (
  url: string,
  headers: Record<string, string>,
  log: Log,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> => {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetchImpl(url, {
        method: "POST",
        headers,
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) {
        log("info", "Revalidated", { url, attempt, status: res.status });
        return true;
      }
      log("warn", "Revalidate request failed", { url, attempt, status: res.status });
    } catch (error) {
      log("warn", "Revalidate request errored", { url, attempt, error: String(error) });
    }
  }
  log("error", "Revalidate gave up after retry", { url });
  return false;
};
