import { useEffect, useState } from "react"
import SubtitlesParser from "subtitles-parser"

const useSubtitles = (subtitlesFileUrl) => {
  const [parsedSubtitles, setParsedSubtitles] = useState([
    { startTime: 1, text: 1 },
  ])

  useEffect(() => {
    const subtitlesAdjustmentMils = 0 // todo, add to UI
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
        const parsed = SubtitlesParser.fromSrt(data, true).map((subtitle) => ({
          ...subtitle,
          startTime: subtitle.startTime + subtitlesAdjustmentMils,
          endTime: subtitle.endTime + subtitlesAdjustmentMils,
          text: subtitle.text.replace(/[\r\n]+|<i>|<\/i>|<br\s*\/?>/gi, " "),
        }))
        setParsedSubtitles(parsed)
      })
      .catch((error) => {
        console.error("Parsing error:", error)
      })
  }, [subtitlesFileUrl])

  return parsedSubtitles
}

export default useSubtitles
