import { AddressResult, searchAddresses } from "@shared/services/address";
import { useEffect, useRef, useState } from "react";

type UseAddressSearchOptions = {
  debounceMs?: number;
  minLength?: number;
};

export function useAddressSearch(options: UseAddressSearchOptions = {}) {
  const { debounceMs = 350, minLength = 2 } = options;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AddressResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestIdRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const q = query.trim();
    if (!q || q.length < minLength) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    timerRef.current = setTimeout(async () => {
      const myRequestId = ++requestIdRef.current;
      setIsLoading(true);
      setError(null);

      try {
        const data = await searchAddresses(q);

        // ✅ 최신 요청만 반영
        if (myRequestId !== requestIdRef.current) return;

        setResults(data);
      } catch (e: any) {
        if (myRequestId !== requestIdRef.current) return;
        setResults([]);
        setError(
          e?.message ? String(e.message) : "주소 검색 중 오류가 발생했습니다.",
        );
      } finally {
        if (myRequestId !== requestIdRef.current) return;
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, debounceMs, minLength]);

  const clear = () => {
    requestIdRef.current++;
    setQuery("");
    setResults([]);
    setIsLoading(false);
    setError(null);
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    clear,
  };
}
