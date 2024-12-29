import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Navigation, Loader2, Map, Locate } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { addRoute } from '@/lib/firebase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { DRIVING_TIME_OPTIONS } from '@/constants';

export const RouteForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [drivingTime, setDrivingTime] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&language=ja`
            );
            const data = await response.json();
            const placeName = data.features[0]?.place_name;
            if (placeName) {
              setStartLocation(placeName);
            }
          } catch (error) {
            console.error('Error getting location name:', error);
            setError('現在地の取得に失敗しました');
          } finally {
            setLocationLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('現在地の取得に失敗しました');
          setLocationLoading(false);
        }
      );
    } else {
      setError('お使いのブラウザは位置情報をサポートしていません');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('ルートを生成するにはログインが必要です');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // APIを呼び出してルートを生成
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          drivingTime: Number(drivingTime),
          startLocation
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'ルートの生成に失敗しました');
      }
      
      const routeData = await response.json();
      
      // Firestoreにルートを保存
      const routeId = await addRoute(user.uid, {
        route: routeData,
        drivingTime: Number(drivingTime),
        startLocation,
        createdAt: new Date().toISOString()
      });

      // 生成されたルートの詳細ページに遷移
      router.push(`/routes/${routeId}`);

    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'ルートの生成に失敗しました');
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Navigation className="h-6 w-6" />
          新しいルートを生成
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">運転時間</label>
            <Select
              value={drivingTime}
              onValueChange={setDrivingTime}
            >
              <SelectTrigger>
                <SelectValue placeholder="運転時間を選択" />
              </SelectTrigger>
              <SelectContent>
                {DRIVING_TIME_OPTIONS.map(option => (
                  <SelectItem 
                    key={option.value} 
                    value={String(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">出発地点（任意）</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Map className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  placeholder="例: 東京駅"
                  className="pl-10"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleGetCurrentLocation}
                disabled={locationLoading}
              >
                <Locate className={`h-4 w-4 ${locationLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !drivingTime}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>生成中...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Navigation className="mr-2 h-4 w-4" />
                <span>ルートを生成</span>
              </div>
            )}
          </Button>

          {!user && (
            <p className="text-sm text-muted-foreground text-center">
              ルートを生成するには、ログインが必要です
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};