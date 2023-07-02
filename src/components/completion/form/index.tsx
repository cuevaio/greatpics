import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { Picture } from "./picture"

export const CompletionForm = ({
  draft,
  setDraft,
  complete,
  url,
  aspect_ratio,
  stop,
  isLoading,
}: {
  url: string
  aspect_ratio: number
  draft: string
  setDraft: (draft: string) => void
  complete: (promp: string) => void
  stop: () => void
  isLoading: boolean
}) => {
  return (
    <form
      className="w-full flex flex-col gap-4 mb-10"
      onSubmit={(event) => {
        event.preventDefault()
        complete("")
      }}
    >
      <div className="relative w-full mx-auto flex items-center gap-x-4">
        <Picture url={url} aspect_ratio={aspect_ratio} />

        <Textarea
          className="resize-none absolute top-0 bottom-0 left-36 right-0 w-auto min-h-[auto] rounded-lg"
          value={draft}
          placeholder="A draft of your tweet..."
          onChange={(e) => {
            setDraft(e.target.value)
          }}
        />
      </div>

      {isLoading ? (
        <Button
          variant="secondary"
          onClick={() => {
            stop()
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
  )
}
