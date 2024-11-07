const isWithinBounds = (currentSubtitleIndex, key, parsedSubtitles) => {
  if (currentSubtitleIndex <= 0 && (key === "," || key === "б")) return false
  if (
    currentSubtitleIndex >= parsedSubtitles.length - 1 &&
    (key === "." || key === "ю")
  )
    return false
  return true
}

const goToPreviousSubtitle = (
  playerRef,
  parsedSubtitles,
  currentSubtitleIndex,
  setCurrentSubtitle
) => {
  if (currentSubtitleIndex > 0) {
    playerRef.current.seekTo(
      parseFloat(parsedSubtitles[currentSubtitleIndex - 1].startTime) / 1000
    )
    setCurrentSubtitle(
      parsedSubtitles[currentSubtitleIndex - 1].text.split(" ")
    )
  }
}

const goToNextSubtitle = (
  playerRef,
  parsedSubtitles,
  currentSubtitleIndex,
  setCurrentSubtitle
) => {
  if (currentSubtitleIndex < parsedSubtitles.length - 1) {
    playerRef.current.seekTo(
      parseFloat(parsedSubtitles[currentSubtitleIndex + 1].startTime) / 1000
    )
    setCurrentSubtitle(
      parsedSubtitles[currentSubtitleIndex + 1].text.split(" ")
    )
  }
}

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
    if (!isWithinBounds(currentSubtitleIndex, event.key, parsedSubtitles))
      return

    if (event.key === "," || event.key === "б" || event.key === "Backspace") {
      goToPreviousSubtitle(
        playerRef,
        parsedSubtitles,
        currentSubtitleIndex,
        setCurrentSubtitle
      )
    }

    if (event.key === "." || event.key === "ю") {
      goToNextSubtitle(
        playerRef,
        parsedSubtitles,
        currentSubtitleIndex,
        setCurrentSubtitle
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
