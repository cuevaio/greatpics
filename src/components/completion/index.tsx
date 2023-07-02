"use client";
import * as React from "react";
import { useCompletion } from "ai/react";
import { ToastAction } from "@/components/ui/toast";
import { motion } from "framer-motion";
import { TweetPreview } from "./tweet-preview";
import { CompletionForm } from "./form";
import { useToast } from "../ui/use-toast";
export const Completion = ({
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

  const { complete, stop, isLoading, completion } = useCompletion({
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
        <CompletionForm
          {...{
            url,
            aspect_ratio,
            draft,
            setDraft,
            isLoading,
            complete,
            stop,
          }}
        />

        {completion && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <TweetPreview
              url={url}
              aspect_ratio={aspect_ratio}
              completion={completion}
            />
          </motion.div>
        )}
      </div>
    </>
  );
};
