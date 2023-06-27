import { AIThing } from "@/components/ai";
import { getXataClient } from "@/lib/xata";

const getPic = async (id: string) => {
  const xata = getXataClient();
  const pic = await xata.db.pic.read(`rec_${id}`);

  return pic;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const pic = await getPic(id);

  if (!pic) {
    return (
      <div className="text-center">
        <h1 className="font-black text-4xl">404</h1>
        <p className="">We couldn{`&apos;`}t find that page...</p>
      </div>
    );
  }

  return (
    <div className="">
      <AIThing
        url={pic?.url || ""}
        caption={pic?.caption || ""}
        aspect_ratio={pic.aspect_ratio || 1 / 1}
      />
    </div>
  );
};

export default Page;
