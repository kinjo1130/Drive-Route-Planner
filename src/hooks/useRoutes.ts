// src/hooks/useRoutes.ts
import { useState, useCallback } from 'react';
import { getUserRoutes, addRoute } from '@/lib/firebase/client';
import type { Route } from '@/types';

export const useRoutes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRoutes = useCallback(async (userId: string) => {
    // すでにローディング中なら実行しない
    if (loading) return;

    setLoading(true);
    try {
      const userRoutes = await getUserRoutes(userId);
      setRoutes(userRoutes);
      setError(null);
    } catch (err) {
      console.error('Error fetching routes:', err);
      setError('ルートの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [loading]); // loadingを依存配列に追加

  const createRoute = async (userId: string, routeData: any) => {
    setLoading(true);
    try {
      const routeId = await addRoute(userId, routeData);
      // 新しいルートを追加したら、再度全てのルートを取得
      await fetchUserRoutes(userId);
      return routeId;
    } catch (err) {
      console.error('Error creating route:', err);
      setError('ルートの作成に失敗しました');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    routes,
    loading,
    error,
    fetchUserRoutes,
    createRoute
  };
};