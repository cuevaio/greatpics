import * as React from "react"

export function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false)

  const onScroll = React.useCallback(() => {
    const content_element = document.getElementById("content")
    if (!content_element) return
    setScrolled(content_element.scrollTop > threshold)
  }, [threshold])

  React.useEffect(() => {
    // div with id="content"
    const content_element = document.getElementById("content")
    if (!content_element) return
    content_element.addEventListener("scroll", onScroll)
    return () => content_element.removeEventListener("scroll", onScroll)
  }, [onScroll])

  return scrolled
}
