import { createUploadthing, type FileRouter } from "uploadthing/next";
import { ratelimit } from "@/lib/redis";
import { getClientID } from "@/lib/utils/get-client-id";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // @ts-ignore
    .middleware(async () => {
      if (ratelimit) {
        const client_id = await getClientID();
        console.log("ut", { client_id });
        const identifier = `api/uploadthing:${client_id}`;
        const result = await ratelimit.limit(identifier);

        console.log(result);
        if (!result.success) {
          throw new Error("429");
        }
      }
    })
    .onUploadComplete(async () => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
