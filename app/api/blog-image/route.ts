import { normalizeNaverImageUrl } from "@/src/domain/blog";

const IMAGE_CACHE_SECONDS = 60 * 60 * 24 * 7;

/** Proxies allowlisted Naver thumbnails so browsers never depend on cross-origin hotlink behavior. */
export async function GET(request: Request) {
  const requestedUrl = new URL(request.url).searchParams.get("url");
  const imageUrl = requestedUrl ? normalizeNaverImageUrl(requestedUrl) : null;
  if (!imageUrl) return Response.json({ message: "허용되지 않은 이미지 주소입니다." }, { status: 400 });

  try {
    const upstream = await fetch(imageUrl, {
      headers: { "User-Agent": "Solomon-Clean-Website-Image-Proxy/1.0" },
      redirect: "error",
      signal: AbortSignal.timeout(5_000),
    });
    const contentType = upstream.headers.get("content-type") ?? "";
    if (!upstream.ok || !contentType.startsWith("image/") || !upstream.body) {
      return Response.json({ message: "이미지를 불러오지 못했습니다." }, { status: 502 });
    }
    return new Response(upstream.body, {
      headers: {
        "Cache-Control": `public, max-age=${IMAGE_CACHE_SECONDS}, stale-while-revalidate=${IMAGE_CACHE_SECONDS}`,
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Failed to proxy Naver blog image", error);
    return Response.json({ message: "이미지를 불러오지 못했습니다." }, { status: 502 });
  }
}
