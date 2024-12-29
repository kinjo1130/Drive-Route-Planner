import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Route } from "@/types";
import { Clock, Locate } from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface RouteMapProps {
	route: Route;
	className?: string;
}

const popupStyle = `
  .mapboxgl-popup-close-button {
    font-size: 24px;
    padding: 8px 12px;
    color: #666;
    right: 4px;
    top: 4px;
  }
  .mapboxgl-popup-close-button:hover {
    color: #000;
    background-color: transparent;
  }
`;

export const RouteMap = ({ route, className }: RouteMapProps) => {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const markersRef = useRef<mapboxgl.Marker[]>([]);
	const [estimatedArrival, setEstimatedArrival] = useState<string | null>(null);

	// カスタムマーカー要素作成関数
	const createMarkerElement = (index: number, total: number) => {
		const el = document.createElement("div");
		el.className = "marker-container";

		// マーカーのスタイル
		const color =
			index === 0 ? "#22c55e" : index === total - 1 ? "#ef4444" : "#0ea5e9";

		el.innerHTML = `
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center" 
             style="border: 3px solid ${color}">
          <span class="text-sm font-bold" style="color: ${color}">${index + 1}</span>
        </div>
      </div>
    `;

		return el;
	};
	useEffect(() => {
		// スタイルを追加
		const styleElement = document.createElement("style");
		styleElement.textContent = popupStyle;
		document.head.appendChild(styleElement);

		return () => {
			styleElement.remove();
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!mapContainer.current || !route.route.spots?.[0]?.coordinates) return;

		// マップの初期化
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [
				route.route.spots[0].coordinates.lng,
				route.route.spots[0].coordinates.lat,
			],
			zoom: 12,
		});

		map.current.on("load", async () => {
			if (!map.current) return;

			// 既存のマーカーをクリア
			// biome-ignore lint/complexity/noForEach: <explanation>
			markersRef.current.forEach((marker) => marker.remove());
			markersRef.current = [];

			// 境界ボックスの設定
			const bounds = new mapboxgl.LngLatBounds();

			// マーカーとポップアップの追加
			route.route.spots.forEach((spot, index) => {
				bounds.extend([spot.coordinates.lng, spot.coordinates.lat]);

				const popupContent = `
          <div class="p-3 min-w-[200px] max-w-[300px]">
            <h3 class="font-bold text-lg">${spot.name}</h3>
            <p class="text-sm text-gray-600 mt-1">${spot.description}</p>
            <div class="mt-3 space-y-2">
              <div class="flex items-center text-sm">
                <span class="font-medium">滞在予定:</span>
                <span class="ml-2">${spot.estimatedTime}</span>
              </div>

              ${
								spot.businessHours
									? `
                <div class="text-sm border-t pt-2 mt-2">
                  <div class="font-medium">営業時間</div>
                  <div class="mt-1">
                    ${spot.businessHours.open} - ${spot.businessHours.close}
                    ${
											spot.businessHours.regularHoliday
												? `<br>定休日: ${spot.businessHours.regularHoliday}`
												: ""
										}
                  </div>
                </div>
              `
									: ""
							}
            </div>
          </div>
        `;

				const popup = new mapboxgl.Popup({
					offset: 25,
					closeButton: true,
					closeOnClick: false,
				}).setHTML(popupContent);

				const marker = new mapboxgl.Marker({
					element: createMarkerElement(index, route.route.spots.length),
				})
					.setLngLat([spot.coordinates.lng, spot.coordinates.lat])
					.setPopup(popup)
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					.addTo(map.current!);

				markersRef.current.push(marker);
			});

			// 地図の表示範囲を調整
			map.current.fitBounds(bounds, {
				padding: { top: 50, bottom: 50, left: 50, right: 50 },
				maxZoom: 15,
			});

			// ルートの描画
			try {
				const coordinates = route.route.spots.map((spot) => [
					spot.coordinates.lng,
					spot.coordinates.lat,
				]);

				const response = await fetch(
					`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates.map((c) => c.join(",")).join(";")}?geometries=geojson&access_token=${mapboxgl.accessToken}`,
				);

				const data = await response.json();

				if (data.routes?.[0]) {
					// 既存のルートレイヤーを削除
					if (map.current.getSource("route")) {
						map.current.removeLayer("route");
						map.current.removeSource("route");
					}

					map.current.addSource("route", {
						type: "geojson",
						data: {
							type: "Feature",
							properties: {},
							geometry: data.routes[0].geometry,
						},
					});

					map.current.addLayer({
						id: "route",
						type: "line",
						source: "route",
						layout: {
							"line-join": "round",
							"line-cap": "round",
						},
						paint: {
							"line-color": "#0ea5e9",
							"line-width": 4,
							"line-opacity": 0.75,
						},
					});

					// 到着予定時刻の計算
					const totalDuration = data.routes[0].duration / 60; // 分単位
					const now = new Date();
					const arrivalTime = new Date(now.getTime() + totalDuration * 60000);
					setEstimatedArrival(
						arrivalTime.toLocaleTimeString("ja-JP", {
							hour: "2-digit",
							minute: "2-digit",
						}),
					);
				}
			} catch (error) {
				console.error("ルート取得エラー:", error);
			}
		});

		return () => {
			// biome-ignore lint/complexity/noForEach: <explanation>
			markersRef.current.forEach((marker) => marker.remove());
			map.current?.remove();
		};
	}, [route]);

	return (
		<Card className={className}>
			<div className="relative">
				<div
					ref={mapContainer}
					className="w-full h-[500px] rounded-lg overflow-hidden"
				/>

				<div className="absolute top-4 right-4 space-y-2">
					{estimatedArrival && (
						<div className="bg-white p-2 rounded-lg shadow-md">
							<div className="flex items-center gap-2 text-sm">
								<Clock className="w-4 h-4" />
								到着予定: {estimatedArrival}
							</div>
						</div>
					)}
				</div>
			</div>
		</Card>
	);
};
