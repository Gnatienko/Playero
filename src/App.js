import React, { useState, useEffect } from "react"
import ReactPlayer from "react-player"
import SubtitlesParser from "subtitles-parser"
import Line from "./Line"

const videoUrl =
  "/The.Big.Bang.Theory.S07E13.720p.HDTV.x264-maximersk_1542749704_720p.mp4" //"/sintel-short.mp4" // "https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4"
const subtitlesUrl =
  "The.Big.Bang.Theory.S07E13.720p.HDTV.x264-maximersk_1542749704_720p.srt" // "/subs.vtt"

const App = () => {
  const [currentSubtitle, setCurrentSubtitle] = useState()
  const [parsedSubtitles, setParsedSubtitles] = useState([
    { startTime: 1, text: 1 },
  ])
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMouseEnter = () => {
    setIsPlaying(false) // Устанавливаем состояние, чтобы остановить воспроизведение
  }

  // Обработчик события, вызываемый при уходе мыши
  const handleMouseLeave = () => {
    setIsPlaying(true) // Возвращаем воспроизведение
  }

  useEffect(() => {
    fetch(subtitlesUrl)
      .then((response) => response.text())
      .then((data) => {
        setParsedSubtitles(SubtitlesParser.fromSrt(data, true))
      })
  }, [])

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
        playing={isPlaying}
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
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Line words={currentSubtitle} />
      </div>
    </div>
  )
}

export default App
