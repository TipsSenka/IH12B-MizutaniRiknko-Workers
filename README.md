# IH12B-MizutaniRiknko-Workers

Cloudflare Workers と Pages を使った専科 API の確認用プロジェクトです。

## 構成

- `pages/`: 静的フロントエンド
- `workes/`: Cloudflare Worker API
- `doc/`: Cloudflare の設定・運用手順

## Worker の起動・デプロイ

```powershell
Set-Location .\workes
npm install
npm run dev
npm run deploy
```

デプロイ後、Pages の `Worker base URL` に発行された `https://<worker-name>.<subdomain>.workers.dev` を入力してください。

## API

- `GET /api/course`: 科目一覧
- `GET /api/hello?name=山田`: 挨拶
- `GET /api/fortune`: 今日の運勢
- `GET /api/events`: 予定一覧
- 未入力の `name` は `400`、未定義パスは `404`