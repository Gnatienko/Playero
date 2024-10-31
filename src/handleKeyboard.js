const handleKeyDown = (
  event,
  playerRef,
  parsedSubtitles,
  currentSubtitleIndex,
  setCurrentSubtitle,
  setIsPlaying,
  setShowFullTranslation
) => {
  try {
    if (currentSubtitleIndex <= 0 && (event.key === "," || event.key === "б"))
      return // Prevents from going below the first subtitle
    if (
      currentSubtitleIndex >= parsedSubtitles.length - 1 &&
      (event.key === "." || event.key === "ю")
    )
      return // Prevents from going past the last subtitle

    if (event.key === "," || event.key === "б" || event.key === "Backspace") {
      playerRef.current.seekTo(
        parseFloat(parsedSubtitles[currentSubtitleIndex - 1].startTime) / 1000
      )
      setCurrentSubtitle(
        parsedSubtitles[currentSubtitleIndex - 1].text.split(" ")
      )
    }
    if (event.key === "." || event.key === "ю") {
      playerRef.current.seekTo(
        parseFloat(parsedSubtitles[currentSubtitleIndex + 1].startTime) / 1000
      )
      setCurrentSubtitle(
        parsedSubtitles[currentSubtitleIndex + 1].text.split(" ")
      )
    }
    if (
      event.key === "t" ||
      event.key === "T" ||
      event.key === "я" ||
      event.key === "е" ||
      event.key === "Е"
    ) {
      setIsPlaying(false)
      setShowFullTranslation(true)
    }
  } catch (error) {
    console.error("Error handling key press:", error)
  }
}

const handleKeyUp = (event, setIsPlaying, setShowFullTranslation) => {
  try {
    if (
      event.key === "я" ||
      event.key === "z" ||
      event.key === "t" ||
      event.key === "T" ||
      event.key === "е" ||
      event.key === "Е"
    ) {
      setIsPlaying(true)
      setShowFullTranslation(false)
    }
  } catch (error) {
    console.error("Error handling key release:", error)
  }
}

export { handleKeyDown, handleKeyUp }
