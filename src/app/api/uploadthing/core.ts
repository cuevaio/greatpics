import { createUploadthing, type FileRouter } from "uploadthing/next";
import { imageRatelimit } from "@/lib/redis";
import { getClientID } from "@/lib/utils/get-client-id";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // @ts-ignore
    .middleware(async () => {
      if (!!process.env.VERCEL) {
        const client_id = await getClientID();
        const identifier = `api/uploadthing:${client_id}`;
        const result = await imageRatelimit.limit(identifier);

        if (!result.success) {
          throw new Error("429");
        }
      }
    })
    .onUploadComplete(async () => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
