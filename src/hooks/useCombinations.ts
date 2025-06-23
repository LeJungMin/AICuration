import { useState, useEffect } from 'react';
import { ToolCombination } from '@/types/tool';
import { loadCombinations } from '@/lib/utils/data';

export const useCombinations = () => {
  const [combinations, setCombinations] = useState<ToolCombination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCombinations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loadCombinations();
        setCombinations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load combinations');
      } finally {
        setLoading(false);
      }
    };

    fetchCombinations();
  }, []);

  return { combinations, loading, error };
};