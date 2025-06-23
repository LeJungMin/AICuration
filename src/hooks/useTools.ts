import { useState, useEffect } from 'react';
import { AITool } from '@/types/tool';
import { 
  loadAllTools, 
  loadToolsByCategory, 
  getPopularTools,
  searchTools,
  findToolById
} from '@/lib/utils/data';

// 모든 도구 가져오기
export const useTools = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loadAllTools();
        setTools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tools');
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  return { tools, loading, error };
};

// 카테고리별 도구 가져오기
export const useToolsByCategory = (category: string) => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loadToolsByCategory(category);
        setTools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : `Failed to load tools for ${category}`);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchTools();
    }
  }, [category]);

  return { tools, loading, error };
};

// 인기 도구 가져오기
export const usePopularTools = (limit: number = 6) => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPopularTools(limit);
        setTools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load popular tools');
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [limit]);

  return { tools, loading, error };
};

// 특정 도구 가져오기
export const useTool = (id: string) => {
  const [tool, setTool] = useState<AITool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await findToolById(id);
        setTool(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : `Failed to load tool ${id}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTool();
    }
  }, [id]);

  return { tool, loading, error };
};

// 검색 훅
export const useSearch = () => {
  const [results, setResults] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (
    query: string,
    filters?: {
      categories?: string[];
      pricing?: string[];
      tags?: string[];
    }
  ) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchTools(query, filters);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return { results, loading, error, search, clearResults };
};