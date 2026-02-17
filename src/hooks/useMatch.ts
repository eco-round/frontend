import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL, type ApiMatch } from "@/config/api";

interface UseMatchReturn {
  match: ApiMatch | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMatch(id: number): UseMatchReturn {
  const [match, setMatch] = useState<ApiMatch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/matches/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch match: ${response.statusText}`);
      }
      const data = await response.json();
      setMatch(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMatch();
  }, [fetchMatch]);

  return { match, isLoading, error, refetch: fetchMatch };
}
