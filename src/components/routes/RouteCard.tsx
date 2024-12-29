// src/components/routes/RouteCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { Route } from '@/types';
import { formatDate } from '@/lib/utils/date';

interface RouteCardProps {
  route: Route;
}

export const RouteCard = ({ route }: RouteCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{route.route.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {formatDate(route.createdAt)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {route.route.duration}
            </span>
            <span>{route.route.distance}</span>
          </div>

          {route.startLocation && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{route.startLocation}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <Link href={`/routes/${route.id}`}>
              <Button variant="outline">詳細を見る</Button>
            </Link>
            <Button
              variant="secondary"
              onClick={() => window.open(route.route.googleMapsUrl, '_blank')}
            >
              Google Mapで見る
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};