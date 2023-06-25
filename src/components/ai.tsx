"use client";
import * as React from "react";
import { useCompletion } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
          className="w-full flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            completeAlt("");
            completeTweet("");
          }}
        >
          <Textarea
            value={draft}
            placeholder="Escribe un borrador..."
            onChange={(e) => {
              setDraft(e.target.value);
            }}
          />
          {isLoadingTweet || isLoadingAlt ? (
            <Button
              variant="secondary"
              onClick={() => {
                stopTweet();
                stopAlt();
              }}
              className="w-full"
            >
              Stop
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={draft.length < 3}
              className="w-full"
            >
              Generate Tweet
            </Button>
          )}
        </form>
      </div>

      {tweet && (
        <TweetPreview
          url={url}
          aspect_ratio={aspect_ratio}
          alt={alt}
          tweet={tweet}
        />
      )}
    </>
  );
};
