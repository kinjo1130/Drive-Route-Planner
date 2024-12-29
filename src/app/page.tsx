import { Button } from "@/components/ui/Button";
import { Coffee, Compass, MapPin, Sun } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="space-y-32">
			{/* ヒーローセクション */}
			<section
				className="relative text-center space-y-6 py-32 
        bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500
        text-white rounded-3xl overflow-hidden"
			>
				<div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
				<div className="relative z-10">
					<h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
						余暇を楽しむお手伝いをします。
						<br  />
						あなたの旅へ出かけよう
					</h1>
					<p className="text-xl text-white/90 max-w-[600px] mx-auto mt-4">
						行きたい場所への時間は自由自在。
						<br/ >
						思い立ったら、すぐにドライブの計画を。
					</p>
					<Link href="/home">
						<Button
							size="lg"
							className="mt-8 bg-white text-black hover:bg-slate-200
              rounded-full px-8 py-6 text-lg font-medium shadow-lg
              hover:shadow-xl transition-all duration-300"
						>
							使ってみる
						</Button>
					</Link>
				</div>
			</section>

			{/* 特徴セクション */}
			<section className="space-y-12">
				<div className="text-center">
					<h2 className="text-3xl font-bold mb-4">毎日を特別な冒険に</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						いつものドライブも、ちょっとした工夫で素敵な思い出に。
						行き当たりばったりの旅も、効率的なプランニングで快適に。
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{[
						{
							icon: Coffee,
							title: "気分に合わせて",
							description:
								"カフェ巡り、絶景ポイント、美味しいレストラン。その日の気分で旅先を選べます。",
						},
						{
							icon: Compass,
							title: "新しい発見",
							description:
								"知らなかった穴場スポットや、季節限定の観光地など、新しい体験との出会い。",
						},
						{
							icon: Sun,
							title: "思い出づくり",
							description:
								"友達とのドライブ、家族旅行、デート。大切な人との特別な時間を演出します。",
						},
					].map((feature) => (
						<div
							key={feature.title}
							className="group p-6 rounded-2xl transition-all
               hover:shadow-lg"
						>
							<div className="text-center space-y-4">
								<div
									className="mx-auto w-12 h-12 rounded-xl bg-orange-100
                  flex items-center justify-center transition-all
                  group-hover:scale-110 "
								>
									<feature.icon className="w-6 h-6 text-orange-600" />
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
        bg-gradient-to-r from-sky-400 to-blue-500 text-white"
			>
				<div className="absolute inset-0 bg-[url('/images/road.jpg')] bg-cover bg-center opacity-30" />
				<div className="absolute inset-0 bg-black/20" />

				<div className="relative z-10 space-y-6 px-4">
					<h2 className="text-3xl font-bold">さぁ、新しい旅に出かけよう</h2>
					<p className="text-xl text-white/90 max-w-2xl mx-auto">
						目的地は決まっていなくても大丈夫。
						行き先に迷ったら、おすすめスポットから素敵な場所をお手伝いをします。
					</p>
					<Link href="/home">
						<Button
							size="lg"
							variant="secondary"
							className="mt-8 bg-white text-black hover:bg-slate-200
              rounded-full px-8 py-6 text-lg font-medium shadow-lg
              hover:shadow-xl transition-all duration-300"
						>
							使ってみる
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
