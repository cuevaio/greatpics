import { Generation } from "@/components/generation";
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
        <p className="">Pic not found</p>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="bg-gradient-to-br from-slate-400 via-black to-slate-400 bg-clip-text text-center font-display text-3xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-5xl md:leading-[5rem]">
        Your tweet
      </h1>
      <Generation
        url={pic?.url || ""}
        caption={pic?.caption || ""}
        aspect_ratio={pic.aspect_ratio || 1 / 1}
      />
    </div>
  );
};

export default Page;
