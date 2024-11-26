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

    const rewKeys = [",", "б"]
    if (rewKeys.includes(event.key.toLowerCase())) {
      goToPreviousSubtitle(
        playerRef,
        parsedSubtitles,
        currentSubtitleIndex,
        setCurrentSubtitle
      )
    }

    const ffKeys = [".", "ю"]
    if (ffKeys.includes(event.key.toLowerCase())) {
      goToNextSubtitle(
        playerRef,
        parsedSubtitles,
        currentSubtitleIndex,
        setCurrentSubtitle
      )
    }
    const translationKeys = ["t", "z", "я", "е"]
    if (translationKeys.includes(event.key.toLowerCase())) {
      setIsPlaying(false)
      setShowFullTranslation(true)
    }
  } catch (error) {
    console.error("Error handling key press:", error)
  }
}

const handleKeyUp = (event, setIsPlaying, setShowFullTranslation) => {
  try {
    if (event.key) {
      setIsPlaying(true)
      setShowFullTranslation(false)
    }
  } catch (error) {
    console.error("Error handling key release:", error)
  }
}

export { handleKeyDown, handleKeyUp }
