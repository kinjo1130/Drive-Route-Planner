import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Clock, MapPin, Navigation, Calendar, Car, Store } from "lucide-react";
import type { Route } from "@/types";

interface RouteDetailProps {
  route: Route;
}

export const RouteDetail = ({ route }: RouteDetailProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="h-6 w-6" />
            <span>{route.route.title}</span>
          </div>
          <span className="text-sm font-normal text-muted-foreground">
            <Calendar className="h-4 w-4 inline-block mr-1" />
            {formatDate(route.createdAt)}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ルート概要 */}
        <div className="space-y-2">
          <p className="text-muted-foreground">{route.route.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {route.route.duration}
            </div>
            <div className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              {route.route.distance}
            </div>
          </div>
        </div>

        {/* 出発地点 */}
        {route.startLocation && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              出発地点
            </h3>
            <p className="text-muted-foreground">{route.startLocation}</p>
          </div>
        )}

        {/* 立ち寄りスポット */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-4">立ち寄りスポット</h3>
          <div className="space-y-4">
            {route.route.spots.map((spot, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{spot.name}</h4>
                  <p className="text-sm text-muted-foreground">{spot.description}</p>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 inline-block mr-1" />
                      想定滞在時間: {spot.estimatedTime}
                    </div>
                    {spot.businessHours && (
                      <div className="text-sm space-y-1 mt-2 p-2 bg-muted rounded">
                        <div className="flex items-center gap-1">
                          <Store className="h-3 w-3" />
                          <span>営業時間情報</span>
                        </div>
                        <div className="pl-4 space-y-0.5">
                          <p>営業時間: {spot.businessHours.open} - {spot.businessHours.close}</p>
                          {spot.businessHours.regularHoliday && (
                            <p>定休日: {spot.businessHours.regularHoliday}</p>
                          )}
                          {spot.businessHours.notes && (
                            <p className="text-xs text-muted-foreground">{spot.businessHours.notes}</p>
                          )}
                           {/* 次のスポットまでの移動情報 */}
                                                    {spot.travelTimeToNext && index < route.route.spots.length - 1 && (
                            <div className="mt-3 p-2 border rounded font-medium">
                              <div className="text-sm space-y-1">
                                <div className="flex items-center gap-2">
                                  <Car className="h-4 w-4" />
                                  <span className="font-bold">次の目的地まで</span>
                                </div>
                                <div className="pl-4 space-y-0.5">
                                  <p className="font-bold">
                                    所要時間: {spot.travelTimeToNext.duration}分
                                  </p>
                                  <p className="font-bold">
                                    距離: {(spot.travelTimeToNext.distance / 1000).toFixed(1)}km
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 注意事項など */}
        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground">
            ※ 交通状況により所要時間が変動する可能性があります。
            天候や季節によって観光スポットの営業時間が異なる場合があります。
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.history.back()}>
          戻る
        </Button>
        <Button onClick={() => window.open(route.route.googleMapsUrl, '_blank')}>
          <MapPin className="mr-2 h-4 w-4" />
          Google Mapで見る
        </Button>
      </CardFooter>
    </Card>
  );
};