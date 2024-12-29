import { Button } from "@/components/ui/Button";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="space-y-32">
			{/* ヒーローセクション */}
			<section
				className="relative text-center space-y-6 py-32
                         bg-gradient-to-r from-purple-600 via-pink-500 to-red-500
                         text-white rounded-3xl overflow-hidden"
			>
				{/* オーバーレイ（背景画像や黒フィルターを足したい場合） */}
				<div className="absolute inset-0 bg-black/20" />
				<div className="relative z-10">
					<h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
						AIがあなたの完璧な
						<br className="md:hidden" />
						ドライブプランを作成
					</h1>
					<p className="text-xl text-white/90 max-w-[600px] mx-auto mt-4">
						行きたい場所と時間を入力するだけ。
						AIがあなたに最適なルートを提案します。
					</p>
					<Link href="/home">
						<Button
							size="lg"
							className="mt-8 bg-primary text-black hover:bg-slate-200 bg-white
                         rounded-full px-8 py-6 text-lg font-medium shadow-lg"
						>
							無料でルートを作成
						</Button>
					</Link>
				</div>
			</section>

			{/* 特徴セクション */}
			<section className="space-y-12">
				<div className="text-center">
					<h2 className="text-3xl font-bold mb-4">AIがあなたの旅をサポート</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						最新のAI技術を活用して、あなただけの特別なドライブプランを作成します。
						時間や場所に合わせて、最適なルートをご提案。
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{[
						{
							icon: Clock,
							title: "最適な時間配分",
							description:
								"移動時間と滞在時間を考慮した、効率的なルートを提案します。",
						},
						{
							icon: MapPin,
							title: "おすすめスポット",
							description:
								"季節や時間帯に合わせた、最適な観光スポットをご紹介。",
						},
						{
							icon: Calendar,
							title: "営業時間を考慮",
							description:
								"各スポットの営業時間や定休日を考慮したプランニング。",
						},
					].map((feature, i) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							className="group p-6 rounded-2xl transition-all
                         hover:bg-primary/5 hover-card-effect"
						>
							<div className="text-center space-y-4">
								<div
									className="mx-auto w-12 h-12 rounded-xl bg-primary/10
                             flex items-center justify-center transition-all
                             group-hover:scale-110"
								>
									<feature.icon className="w-6 h-6 text-primary" />
								</div>
								<h3 className="text-xl font-semibold">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CTAセクション */}
			<section
				className="relative text-center py-20 rounded-2xl overflow-hidden
                   bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500
                   text-white"
			>
				{/* 背景画像など追加したい場合 */}
				<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464660439080-b79116909ce7?w=1200')] bg-cover bg-center opacity-30" />

				<div className="relative z-10 space-y-6 px-4">
					<h2 className="text-3xl font-bold">あなたの思い出に残るドライブを</h2>
					<p className="text-xl text-white/90 max-w-2xl mx-auto">
						AIがあなたの希望に合わせて、最適なドライブプランを提案します。
						素敵な思い出作りのお手伝いをさせてください。
					</p>
					<Link href="/home">
						<Button
							size="lg"
							variant="secondary"
							className="mt-8 bg-primary text-black hover:bg-slate-200 bg-white
							rounded-full px-8 py-6 text-lg font-medium shadow-lg"
						>
							無料でルートを作成
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
