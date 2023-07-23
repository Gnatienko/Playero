import React, { useState, useEffect } from "react"
import ReactPlayer from "react-player"
import SubtitlesParser from "subtitles-parser"
import Line from "./Line"

const videoUrl =
  "https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4"
const subtitlesUrl = "/subs.vtt"

const App = () => {
  const [currentSubtitle, setCurrentSubtitle] = useState()
  const [parsedSubtitles, setParsedSubtitles] = useState([
    { startTime: 1, text: 1 },
  ])

  useEffect(() => {
    fetch(subtitlesUrl)
      .then((response) => response.text())
      .then((data) => {
        setParsedSubtitles(
          SubtitlesParser.fromSrt(data.replace(/\./g, ","), true)
        )
      })
  }, [])

  console.log(parsedSubtitles)

  const handleProgress = (state) => {
    const PlayedMillisecond = state.playedSeconds * 1000
    const currentLine = parsedSubtitles.find(
      (subtitle) =>
        subtitle.startTime < PlayedMillisecond &&
        subtitle.endTime > PlayedMillisecond
    )
    setCurrentSubtitle(currentLine ? currentLine.text.split(" ") : "")
    console.log(currentSubtitle)
  }

  return (
    <div>
      <ReactPlayer
        onProgress={handleProgress}
        url={videoUrl}
        controls={true}
        width="100%"
        height="auto"
        config={{
          file: {
            tracks: [
              {
                kind: "subtitles",
                src: subtitlesUrl,
                srcLang: "en",
                default: true,
              },
            ],
          },
        }}
      />
      <Line words={currentSubtitle} />
    </div>
  )
}

export default App
