const handleProgress = (
  state,
  parsedSubtitles,
  setCurrentSubtitle,
  setCurrentSubtitleIndex
) => {
  const playedMilliseconds = state.playedSeconds * 1000
  const currentLine = parsedSubtitles.find(
    (subtitle) =>
      subtitle.startTime < playedMilliseconds &&
      subtitle.endTime > playedMilliseconds
  )
  setCurrentSubtitle(currentLine ? currentLine.text.split(" ") : [])
  const currentLineIndex =
    parsedSubtitles.findIndex(
      (subtitle) =>
        subtitle.startTime > playedMilliseconds &&
        subtitle.endTime > playedMilliseconds
    ) - 1
  setCurrentSubtitleIndex(currentLineIndex)
}

export default handleProgress
