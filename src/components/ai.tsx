"use client";
import * as React from "react";
import { useCompletion } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { TweetPreview } from "./tweet-preview";

export const AIThing = ({
  caption,
  url,
  aspect_ratio,
}: {
  caption: string;
  url: string;
  aspect_ratio: number;
}) => {
  const [draft, setDraft] = React.useState("");

  const {
    completion: alt,
    complete: completeAlt,
    stop: stopAlt,
    isLoading: isLoadingAlt,
  } = useCompletion({
    api: "/api/ai/alt",
    body: { caption, draft },
  });

  const {
    completion: tweet,
    complete: completeTweet,
    stop: stopTweet,
    isLoading: isLoadingTweet,
  } = useCompletion({
    api: "/api/ai/tweet",
    body: { caption, draft },
  });

  return (
    <>
      <div className="mx-auto my-8 max-w-xl">
        <form
          className="w-full flex flex-col gap-2 mb-10"
          onSubmit={(event) => {
            event.preventDefault();
            completeAlt("");
            completeTweet("");
          }}
        >
          <div className="relative w-full p-2 mx-auto flex items-center gap-4 border rounded-lg">
            <span className="absolute -top-6 left-0 font-bold text-muted-foreground">
              Input
            </span>
            <div className="w-32 grow-0 shrink-0 overflow-hidden border rounded-lg">
              <AspectRatio ratio={aspect_ratio || 1 / 1}>
                <Image src={url} alt="" fill className="object-cover" />
              </AspectRatio>
            </div>

            <Textarea
              className="resize-none	absolute top-2 bottom-2 left-36 right-2 w-auto rounded-lg"
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
              className="w-full rounded-lg"
            >
              Stop
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={draft.length < 3}
              className="w-full rounded-lg"
            >
              Generate Tweet
            </Button>
          )}
        </form>

        {tweet && (
          <TweetPreview
            url={url}
            aspect_ratio={aspect_ratio}
            alt={alt}
            tweet={tweet}
          />
        )}
      </div>
    </>
  );
};
