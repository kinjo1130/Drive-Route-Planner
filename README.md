# Drive Route Planner

ドライブルートの計画を AI が支援するウェブアプリケーションです。目的地までの最適なルートを提案し、観光スポットの情報や営業時間を確認できます。

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- MapBox API
- OpenAI API
- Firebase Authentication
- Vercel (デプロイ)

## 主な機能

- 🚗 AI によるドライブルート提案
- 🗺️ インタラクティブな地図表示
- 🕒 スポットの営業時間確認
- 📍 現在地からのナビゲーション
- 👤 ユーザー認証
- 💾 ルート保存・共有機能

## インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/drive-route-planner.git
cd drive-route-planner

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# Firebase設定
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# OpenAI API
OPENAI_API_KEY=

# Mapbox
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=# Drive-Route-Planner
