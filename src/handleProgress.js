const handleProgress = (
  state,
  parsedSubtitles,
  setCurrentSubtitle,
  setCurrentSubtitleIndex
) => {
  const playedMilliseconds = state.playedSeconds * 1000

  const currentLineIndex = parsedSubtitles.findIndex(
    (subtitle) =>
      subtitle.startTime < playedMilliseconds &&
      subtitle.endTime > playedMilliseconds
  )
  const currentLine = parsedSubtitles[currentLineIndex]
  setCurrentSubtitle(currentLine ? currentLine.text.split(" ") : [])

  setCurrentSubtitleIndex(currentLineIndex)
}

export default handleProgress
