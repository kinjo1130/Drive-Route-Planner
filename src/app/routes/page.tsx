
// src/app/routes/page.tsx
'use client';

import { RouteList } from '@/components/routes/RouteList';

export default function RoutesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">生成したルート一覧</h1>
        <p className="mt-2 text-muted-foreground">
          過去に生成したルートを確認できます
        </p>
      </div>
      <RouteList />
    </div>
  );
}