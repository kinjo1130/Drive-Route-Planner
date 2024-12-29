// src/components/routes/RouteList.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRoutes } from '@/hooks/useRoutes';
import { RouteCard } from './RouteCard';
import { RouteFilter } from './RouteFilter';
import { useFilter } from '@/hooks/useFilter';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ScrollText, Loader2 } from 'lucide-react';

export const RouteList = () => {
  const { user } = useAuth();
  const { routes, loading, error, fetchUserRoutes } = useRoutes();
  const { 
    filteredRoutes,
    searchTerm,
    setSearchTerm,
    minTime,
    setMinTime,
    maxTime,
    setMaxTime
  } = useFilter(routes);

  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    const initializeRoutes = async () => {
      if (user && !isInitialized) {
        await fetchUserRoutes(user.uid);
        setIsInitialized(true);
      }
    };

    initializeRoutes();
  }, [user, fetchUserRoutes, isInitialized]);

  if (!user) {
    return (
      <Alert>
        <AlertDescription className="text-center">
          ルート履歴を見るにはログインしてください
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  // ここでローディング状態をチェック
  if (loading && !isInitialized) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

 // routes が undefined や null の場合も考慮
 if (!loading && (!routes || routes.length === 0)) {
  return (
    <Card className="text-center py-8">
      <CardContent>
        <ScrollText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">ルートがありません</h3>
        <p className="text-muted-foreground">
          新しいルートを生成してみましょう
        </p>
      </CardContent>
    </Card>
  );
}

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="w-6 h-6" />
            生成したルート一覧
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RouteFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              minTime={minTime}
              setMinTime={setMinTime}
              maxTime={maxTime}
              setMaxTime={setMaxTime}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRoutes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteList;