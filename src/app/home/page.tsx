// src/app/page.tsx
"use client";

import { RouteForm } from "@/components/routes/RouteForm";
import { RouteList } from "@/components/routes/RouteList";

export default function Home() {
	return (
		<div className="space-y-12">
			<div className="text-center">
				<h1 className="text-4xl font-bold">ドライブルートを探す</h1>
				<p className="mt-2 text-xl text-muted-foreground">
					希望の運転時間を入力すると、AIがおすすめルートを提案します
				</p>
			</div>

			<div className="max-w-2xl mx-auto">
				<RouteForm />
			</div>

			<RouteList />
		</div>
	);
}
