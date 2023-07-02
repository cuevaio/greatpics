import { createUploadthing, type FileRouter } from "uploadthing/next";
import { imageRatelimit } from "@/lib/upstash";
import { getClientID } from "@/lib/utils/get-client-id";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    .middleware(async () => {
      try {
        if (!!process.env.VERCEL) {
          const client_id = await getClientID();
          const identifier = `api/uploadthing:${client_id}`;
          const result = await imageRatelimit.limit(identifier);

          if (!result.success) {
            throw new Error("429");
          }
        }
        return { foo: "bar" };
      } catch (e) {
        throw new Error("500");
      }
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
