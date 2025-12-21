# VALORISE（ヴァロライズ）｜フィジカル測定サービス

## プロジェクト概要

**VALORISE**は、理学療法士・トレーナーの中越清登が提供する、競技力向上と怪我予防のためのフィジカル測定サービスのホームページです。

- **名称**: VALORISE Physical Assessment Service
- **目的**: フィジカル測定サービスの認知拡大と問い合わせ獲得
- **言語**: 日本語・英語（言語切り替え機能搭載）
- **技術スタック**: Hono + TypeScript + Cloudflare Pages + TailwindCSS

## 🌐 公開URL

- **開発環境**: https://3000-ifek93h66qf4ojgk9coea-02b9cc79.sandbox.novita.ai
- **本番環境**: 未デプロイ（Cloudflare Pagesへのデプロイ準備完了）

## ✨ 主な機能

### 実装済み機能

1. **日英バイリンガル対応**
   - ワンクリックで日本語⇔英語切り替え
   - すべてのコンテンツが両言語対応

2. **レスポンシブデザイン**
   - モバイル、タブレット、デスクトップに完全対応
   - モバイルメニューの実装

3. **セクション構成**
   - ヒーローセクション（印象的なファーストビュー）
   - VALORISEとは（サービス紹介）
   - 8つの特徴（差別化ポイント）
   - 測定項目（スプリント、ジャンプ、筋力、可動域）
   - 4つの導入メリット
   - ターゲット層
   - 料金プラン（Entry / Core / Edge / Prime）
   - CTAセクション
   - お問い合わせフォーム

4. **インタラクティブ機能**
   - スクロールアニメーション（AOS.js）
   - ナビゲーションバーのスクロール対応
   - ホバーエフェクト
   - スムーススクロール
   - お問い合わせフォームのバリデーション

5. **お問い合わせAPI**
   - `/api/contact` エンドポイント実装
   - フォームバリデーション
   - エラーハンドリング

## 📊 データ構造

### サービスプラン

| プラン | 価格 | 内容 |
|--------|------|------|
| **VALORISE Entry** | ¥110,000 | お試しプラン（基本測定のみ） |
| **VALORISE Core** | ¥198,000 | スタンダードプラン（チームレポート付き） |
| **VALORISE Edge** | ¥440,000 | アドバンスプラン（個人レポート付き）★おすすめ |
| **VALORISE Prime** | ¥660,000〜 | プレミアムプラン（個別トレーニングプログラム付き） |

### 測定項目

- **スプリント測定**: 5m / 10m / 30m タイム、加速力、最高速度
- **ジャンプ測定**: CMJ、SCMJ、RB（リバウンドジャンプ）、RSI、左右差
- **筋力・パワー測定**: デッドリフト、スクワット、ベンチプレス、懸垂、RDL30、プッシュプレス（VBT分析）
- **可動域・柔軟性**: 肩関節、股関節、ハムストリング、動作連動性

## 🏗️ プロジェクト構造

```
webapp/
├── src/
│   └── index.tsx          # メインHonoアプリケーション（ルーティング、API、HTML生成）
├── public/
│   └── static/
│       ├── app.js         # フロントエンドJavaScript（言語切り替え、アニメーション、フォーム処理）
│       └── styles.css     # カスタムCSS（アニメーション、ホバーエフェクト）
├── dist/                  # ビルド出力（Cloudflare Pages用）
│   ├── _worker.js         # コンパイルされたHonoアプリ
│   ├── _routes.json       # ルーティング設定
│   └── static/            # 静的ファイル
├── ecosystem.config.cjs   # PM2設定ファイル
├── package.json           # 依存関係とスクリプト
├── wrangler.jsonc         # Cloudflare Pages設定
├── vite.config.ts         # Vite設定
└── README.md              # このファイル
```

## 🚀 開発環境セットアップ

### 必要条件

- Node.js 18以上
- npm または yarn

### ローカル開発

```bash
# 依存関係のインストール（すでにインストール済み）
npm install

# ビルド
npm run build

# ポートのクリーンアップ
npm run clean-port

# 開発サーバー起動（PM2）
pm2 start ecosystem.config.cjs

# サーバーステータス確認
pm2 list

# ログ確認
pm2 logs valorise-webapp --nostream

# サーバー停止
pm2 delete valorise-webapp
```

### テスト

```bash
# サーバーの動作確認
npm run test
# または
curl http://localhost:3000
```

## 📦 デプロイ

### Cloudflare Pagesへのデプロイ

#### 1. Cloudflare API設定（初回のみ）

```bash
# setup_cloudflare_api_key ツールを使用してAPI設定
```

#### 2. プロジェクト作成（初回のみ）

```bash
# プロジェクト作成
npx wrangler pages project create webapp \
  --production-branch main \
  --compatibility-date 2024-01-01
```

#### 3. デプロイ実行

```bash
# ビルドとデプロイ
npm run deploy:prod
```

#### 4. デプロイ後のURL

- 本番: `https://webapp.pages.dev`
- ブランチ: `https://main.webapp.pages.dev`

## 🎨 デザイン仕様

### カラーパレット

- **プライマリ**: `#667eea` → `#764ba2` （グラデーション）
- **セカンダリ**: White, Gray
- **アクセント**: Yellow (おすすめバッジ)

### フォント

- **日本語**: Noto Sans JP
- **英語**: Roboto

### アニメーション

- **AOS.js**: スクロールアニメーション
- **Custom CSS**: ホバーエフェクト、トランジション
- **Parallax**: ヒーローセクション

## 🛠️ トラブルシューティング

### サーバーが起動しない場合

```bash
# ポート3000を使用しているプロセスを確認
lsof -i :3000

# 強制終了
fuser -k 3000/tcp

# PM2をリセット
pm2 delete all
pm2 kill
```

### ビルドエラー

```bash
# node_modulesを再インストール
rm -rf node_modules package-lock.json
npm install

# キャッシュをクリア
rm -rf dist .wrangler
npm run build
```

## 📧 お問い合わせ情報

- **運営会社**: 株式会社LOOPZ
- **所在地**: 東京都調布市上石原2−40−6 B1F
- **メール**: nakagoshi@loopz.co.jp
- **責任者**: 中越清登（理学療法士・トレーナー）

## 📝 次のステップ（推奨）

### 未実装機能

- [ ] ブログ・実績紹介セクション
- [ ] 測定事例・ケーススタディ
- [ ] 動画コンテンツの埋め込み
- [ ] 予約システムとの連携
- [ ] メール送信機能（現在はコンソールログのみ）
- [ ] SEO最適化（メタタグ、構造化データ）
- [ ] Google Analytics / タグマネージャー統合
- [ ] SNSシェアボタン
- [ ] チャットボット

### 推奨される改善

1. **メール送信機能の実装**
   - SendGrid / Mailgun / Resend などのサービスとの連携
   - 自動返信メール設定

2. **データベース連携**
   - Cloudflare D1でお問い合わせ履歴管理
   - 測定予約システム

3. **CMSの導入**
   - 実績・事例をCMSで管理
   - ブログ機能の追加

4. **多言語対応の拡張**
   - 中国語、韓国語、その他言語の追加

5. **A/Bテスト**
   - CTAボタンのテスト
   - ランディングページの最適化

## 📄 ライセンス

© 2024 VALORISE - Powered by LOOPZ Inc. All rights reserved.

## 🔄 更新履歴

### 2024-12-21（初回リリース）

- プロジェクト初期セットアップ
- 日英バイリンガル対応ホームページ実装
- 8つの主要セクション完成
- レスポンシブデザイン対応
- お問い合わせフォームAPI実装
- PM2設定とデプロイ準備完了

---

**開発者**: Claude (AI Coding Assistant)  
**最終更新**: 2024-12-21  
**ステータス**: ✅ 開発完了 / デプロイ準備完了
