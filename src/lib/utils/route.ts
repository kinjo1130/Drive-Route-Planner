// src/lib/utils/route.ts
import type { Route } from '../../types';

export const sortRoutesByDate = (routes: Route[]) => {
  return [...routes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};