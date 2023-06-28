"use client";
import * as React from "react";
import { useCompletion } from "ai/react";

import { TweetPreview } from "./tweet-preview";
import { GenerationForm } from "./form";

export const Generation = ({
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
        <GenerationForm
          {...{
            url,
            aspect_ratio,
            draft,
            setDraft,
            completeAlt,
            completeTweet,
            stopAlt,
            stopTweet,
            isLoadingAlt,
            isLoadingTweet,
          }}
        />

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
