import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL, type ApiMatch } from "@/config/api";

interface UseMatchesReturn {
  matches: ApiMatch[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMatches(statusFilter?: string): UseMatchesReturn {
  const [matches, setMatches] = useState<ApiMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/matches`);
      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.statusText}`);
      }
      const data = await response.json();
      let fetchedMatches = data.matches || [];

      if (statusFilter) {
        fetchedMatches = fetchedMatches.filter(
          (match: ApiMatch) => match.status === statusFilter
        );
      }

      setMatches(fetchedMatches);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, isLoading, error, refetch: fetchMatches };
}
