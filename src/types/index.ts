// src/types/index.ts
interface Coordinates {
  lat: number;
  lng: number;
}

interface Spot {
  name: string;
  description: string;
  coordinates: Coordinates;
  estimatedTime: string;
  businessHours: {
    open: string;
    close: string;
    regularHoliday: string;
    notes: string;
  };
  travelTimeToNext: {
    duration: number;  // 分
    distance: number;  // メートル
  }
}

export interface RouteDetails {
  title: string;
  description: string;
  spots: Spot[];
  duration: string;
  distance: string;
  googleMapsUrl: string;
  waypoints: Coordinates[];
}

export interface Route {
  id: string;
  userId: string;
  route: RouteDetails;
  createdAt: string;
  drivingTime: number;
  startLocation?: string;
}