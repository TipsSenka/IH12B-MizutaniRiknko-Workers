const courses = [
  { id: 1, name: "Webデザイン", instructor: "高橋先生", schedule: "月曜日 3限" },
  { id: 2, name: "Cloudflare Workers", instructor: "高橋先生", schedule: "水曜日 4限" },
  { id: 3, name: "フロントエンド開発", instructor: "高橋先生", schedule: "金曜日 2限" }
];

const events = [
  { date: "2026-09-15", title: "中間発表", place: "教室A" },
  { date: "2026-09-25", title: "成果物提出", place: "オンライン" },
  { date: "2026-10-02", title: "最終講評", place: "教室A" }
];

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const allowedOrigin = env.ALLOWED_ORIGIN === "*" || env.ALLOWED_ORIGIN === origin
    ? origin || "*"
    : env.ALLOWED_ORIGIN;

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=UTF-8"
  };
}

function json(data, status, request, env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(request, env)
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    if (request.method !== "GET") {
      return json({ error: "Method Not Allowed" }, 405, request, env);
    }

    const url = new URL(request.url);

    if (url.pathname === "/api" || url.pathname === "/api/") {
      return json({ status: "ok", service: "senka-api" }, 200, request, env);
    }

    if (url.pathname === "/api/course") {
      return json({ courses }, 200, request, env);
    }

    if (url.pathname === "/api/hello") {
      const name = url.searchParams.get("name")?.trim();
      if (!name) {
        return json({ error: "name is required" }, 400, request, env);
      }
      return json({ message: `こんにちは、${name}さん！` }, 200, request, env);
    }

    if (url.pathname === "/api/fortune") {
      const fortunes = ["大吉", "中吉", "小吉", "吉"];
      const fortune = fortunes[new Date().getDate() % fortunes.length];
      return json({ fortune }, 200, request, env);
    }

    if (url.pathname === "/api/events") {
      return json({ events }, 200, request, env);
    }

    return json({ error: "Not Found" }, 404, request, env);
  }
};
