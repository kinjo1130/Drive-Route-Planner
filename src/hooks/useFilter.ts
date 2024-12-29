
// src/hooks/useFilter.ts
import { useState, useMemo } from 'react';
import type { Route } from '@/types';

export const useFilter = (routes: Route[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minTime, setMinTime] = useState<number | null>(null);
  const [maxTime, setMaxTime] = useState<number | null>(null);

  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      const matchesSearch = searchTerm === '' || 
        route.route.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.startLocation?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTime = (!minTime || route.drivingTime >= minTime) &&
        (!maxTime || route.drivingTime <= maxTime);

      return matchesSearch && matchesTime;
    });
  }, [routes, searchTerm, minTime, maxTime]);

  return {
    filteredRoutes,
    searchTerm,
    setSearchTerm,
    minTime,
    setMinTime,
    maxTime,
    setMaxTime
  };
};