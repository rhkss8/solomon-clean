import { get } from "@vercel/blob";
import { getAdminSession } from "@/src/server/admin-session";

export async function GET(request: Request) {
  if (!await getAdminSession()) return new Response("Unauthorized", { status: 401 });
  const pathname = new URL(request.url).searchParams.get("pathname") ?? "";
  if (!/^estimates\/[0-9a-f-]{36}\/[0-9a-f-]+\.(jpg|png|webp)$/i.test(pathname)) return new Response("Invalid photo", { status: 400 });
  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) return new Response("Not found", { status: 404 });
  return new Response(result.stream, { headers: { "Content-Type": result.blob.contentType || "application/octet-stream", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
}
