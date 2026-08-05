import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const uploadPath = /^estimates\/[0-9a-f-]{36}\/[0-9a-f-]+\.(jpg|png|webp)$/;

/** Issues tightly scoped private Blob upload tokens for estimate photos. */
export async function POST(request: Request) {
  try {
    const body = await request.json() as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!uploadPath.test(pathname)) throw new Error("Invalid estimate photo path.");
        return {
          access: "private",
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: 10 * 1024 * 1024,
          addRandomSuffix: false,
          allowOverwrite: false,
          tokenPayload: pathname,
        };
      },
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 400 });
  }
}
