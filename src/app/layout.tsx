import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://drive-route-planner.com"),
	title: {
		default: "Drive Route Planner - AIがあなたの最適なドライブコースを提案",
		template: "%s | Drive Route Planner",
	},
	description:
		"AIが最適なドライブルートを提案。観光スポット、休憩ポイント、所要時間を考慮した、あなただけの特別なドライブプランを作成します。",
	keywords: [
		"ドライブプラン",
		"ルート作成",
		"AI",
		"観光",
		"ドライブコース",
		"旅行計画",
		"おでかけ",
	],
	authors: [{ name: "Drive Route Planner Team" }],
	openGraph: {
		title: "Drive Route Planner - AIがあなたの最適なドライブコースを提案",
		description:
			"AIが最適なドライブルートを提案。観光スポット、休憩ポイント、所要時間を考慮した、あなただけの特別なドライブプランを作成します。",
		url: "https://drive-route-planner.com",
		siteName: "Drive Route Planner",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Drive Route Planner - AIドライブプランニング",
			},
		],
		locale: "ja_JP",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Drive Route Planner - AIがドライブコースを提案",
		description:
			"AIが最適なドライブルートを提案。観光スポット、休憩ポイント、所要時間を考慮したプランを作成します。",
		images: ["/og-image.jpg"],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<head>
				<link rel="canonical" href="https://drive-route-planner.com" />
			</head>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="min-h-screen flex flex-col bg-background">
						<Header />
						<main className="flex-1 container mx-auto px-4 py-8">
							{children}
						</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
