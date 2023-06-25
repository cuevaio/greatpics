import { AIThing } from "@/components/ai";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getXataClient } from "@/lib/xata";
import Image from "next/image";

const getPic = async (id: string) => {
  const xata = getXataClient();
  const pic = await xata.db.pic.read(`rec_${id}`);

  return pic;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const pic = await getPic(id);

  if (!pic) {
    return <div>404</div>;
  }

  return (
    <div className="mt-8">
      <div className="w-72 p-2 mx-auto flex items-center gap-2 border rounded-lg hover:cursor-pointer">
        <div className="w-24 h-min grow-0 shrink-0 overflow-hidden border rounded-lg">
          <AspectRatio ratio={pic.aspect_ratio || 1 / 1}>
            <Image
              src={pic?.url || ""}
              alt={pic?.caption || ""}
              fill
              className="object-cover"
            />
          </AspectRatio>
        </div>
        <p className="text-sm">{pic.caption}</p>
      </div>

      <AIThing
        url={pic?.url || ""}
        caption={pic?.caption || ""}
        aspect_ratio={pic.aspect_ratio || 1 / 1}
      />
    </div>
  );
};

export default Page;
