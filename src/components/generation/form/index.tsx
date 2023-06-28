import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Picture } from "./picture";

export const GenerationForm = ({
  draft,
  setDraft,
  url,
  aspect_ratio,
  completeAlt,
  completeTweet,
  stopAlt,
  stopTweet,
  isLoadingAlt,
  isLoadingTweet,
}: {
  url: string;
  aspect_ratio: number;
  draft: string;
  setDraft: (draft: string) => void;
  completeAlt: (promp: string) => void;
  completeTweet: (promp: string) => void;
  stopAlt: () => void;
  stopTweet: () => void;
  isLoadingAlt: boolean;
  isLoadingTweet: boolean;
}) => {
  return (
    <form
      className="w-full flex flex-col gap-2 mb-10"
      onSubmit={(event) => {
        event.preventDefault();
        completeAlt("");
        completeTweet("");
      }}
    >
      <div className="relative w-full mx-auto flex items-center gap-4">
        <span className="absolute -top-6 left-0 font-bold text-muted-foreground">
          Input
        </span>
        <Picture url={url} aspect_ratio={aspect_ratio} />

        <Textarea
          className="resize-none	absolute top-0 bottom-0 left-36 right-0 w-auto rounded-lg"
          value={draft}
          placeholder="A draft of your tweet..."
          onChange={(e) => {
            setDraft(e.target.value);
          }}
        />
      </div>

      {isLoadingTweet || isLoadingAlt ? (
        <Button
          variant="secondary"
          onClick={() => {
            stopTweet();
            stopAlt();
          }}
        >
          Stop
        </Button>
      ) : (
        <Button type="submit" disabled={draft.length < 3}>
          Generate Tweet
        </Button>
      )}
    </form>
  );
};
