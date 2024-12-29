// src/app/routes/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { RouteDetail } from '@/components/routes/RouteDetail';
import { RouteMap } from '@/components/routes/RouteMap';
import { getRouteById } from '@/lib/firebase/client';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';
import type { Route } from '@/types';

export default function RoutePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoute = async () => {
      try {
        const routeData = await getRouteById(resolvedParams.id);
        if (!routeData) {
          setError('ルートが見つかりません');
          return;
        }
        setRoute(routeData);
      } catch (err) {
        setError('ルートの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadRoute();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error || !route) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/')}>トップに戻る</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RouteDetail route={route} />
      <RouteMap route={route} />
    </div>
  );
}