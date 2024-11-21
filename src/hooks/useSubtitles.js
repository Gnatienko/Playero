import { useEffect, useState } from "react"
import SubtitlesParser from "subtitles-parser"

const adjustSubtitleTime = (subtitles) => {
  const subtitlesAdjustmentMils = -500 // todo, add to UI
  return subtitles.map((subtitle) => ({
    ...subtitle,
    startTime: subtitle.startTime + subtitlesAdjustmentMils,
    endTime: subtitle.endTime + subtitlesAdjustmentMils,
    text: subtitle.text.replace(/[\r\n]+|<i>|<\/i>|<br\s*\/?>/gi, " "),
  }))
}

const useSubtitles = (subtitlesFileUrl) => {
  const [parsedSubtitles, setParsedSubtitles] = useState([
    { startTime: 1, text: 1 },
  ])

  useEffect(() => {
    if (!subtitlesFileUrl) return
    fetch(subtitlesFileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network error: ${response.status} ${response.statusText}`
          )
        }
        return response.text()
      })
      .then((data) => {
        const parsed = adjustSubtitleTime(SubtitlesParser.fromSrt(data, true))
        setParsedSubtitles(parsed)
      })
      .catch((error) => {
        console.error("Parsing error:", error)
      })
  }, [subtitlesFileUrl])

  return parsedSubtitles
}

export default useSubtitles
