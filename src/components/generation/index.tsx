"use client";
import * as React from "react";
import { useCompletion } from "ai/react";
import { ToastAction } from "@/components/ui/toast";

import { TweetPreview } from "./tweet-preview";
import { GenerationForm } from "./form";
import { useToast } from "../ui/use-toast";
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
  const { toast } = useToast();

  const {
    completion: alt,
    complete: completeAlt,
    stop: stopAlt,
    isLoading: isLoadingAlt,
  } = useCompletion({
    api: "/api/ai/alt",
    body: { caption, draft },
    onResponse: (res) => {
      if (res.status === 429) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "You are being rate limited. Please try again later.",
        });
      } else if (res.status === 500) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Our bad. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
  });

  const {
    completion: tweet,
    complete: completeTweet,
    stop: stopTweet,
    isLoading: isLoadingTweet,
  } = useCompletion({
    api: "/api/ai/tweet",
    body: { caption, draft },
    onResponse: (res) => {
      if (res.status === 429) {
        toast({
          variant: "destructive",
          title: "Oops! Too many requests for now :(",
          description:
            "You are being rate limited. You can generate 10 alt texts per hour. Please try again later.",
        });
      } else if (res.status === 500) {
        toast({
          variant: "destructive",
          title: "Oops! Too many requests for now :(",
          description:
            "You are being rate limited. You can generate 10 tweets texts per hour. Please try again later.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
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
