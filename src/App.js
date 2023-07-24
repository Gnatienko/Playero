import React, { useState, useEffect, useRef } from "react"
import ReactPlayer from "react-player"
import SubtitlesParser from "subtitles-parser"
import Line from "./Line"
import "./App.css"

const App = () => {
  const playerRef = useRef(null)
  const fileInputRef = useRef(null)
  const subtitlesFileInputRef = useRef(null)

  const [fileUrl, setFileUrl] = useState("")
  const [subtitlesFileUrl, setSubtitlesFileUrl] = useState("")
  const [currentSubtitle, setCurrentSubtitle] = useState()
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)

  const [parsedSubtitles, setParsedSubtitles] = useState([
    { startTime: 1, text: 1 },
  ])
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMouseEnter = () => {
    setIsPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsPlaying(true)
  }

  useEffect(() => {
    fetch(subtitlesFileUrl)
      .then((response) => response.text())
      .then((data) => {
        setParsedSubtitles(
          SubtitlesParser.fromSrt(
            data.replace(/<i>|<\/i>|<br\s*\/?>/gi, " "),
            true
          )
        )
      })
  }, [subtitlesFileUrl])

  const handleProgress = (state) => {
    const PlayedMillisecond = state.playedSeconds * 1000
    const currentLine = parsedSubtitles.find(
      (subtitle) =>
        subtitle.startTime < PlayedMillisecond &&
        subtitle.endTime > PlayedMillisecond
    )
    setCurrentSubtitle(currentLine ? currentLine.text.split(" ") : "")

    const currentLineIndex =
      parsedSubtitles.findIndex(
        (subtitle) =>
          subtitle.startTime > PlayedMillisecond &&
          subtitle.endTime > PlayedMillisecond
      ) - 1
    setCurrentSubtitleIndex(currentLineIndex)
  }

  const handleKeyDown = (event) => {
    if (event.key === "1") {
      playerRef.current.seekTo(
        parseFloat(parsedSubtitles[currentSubtitleIndex - 1].startTime) / 1000
      )
    }
    if (event.key === "2") {
      playerRef.current.seekTo(
        parseFloat(parsedSubtitles[currentSubtitleIndex + 1].startTime) / 1000
      )
    }
  }

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0]
    if (file) {
      const fileURL = URL.createObjectURL(file)
      setFileUrl(fileURL)
    }
  }

  const handleSubtitlesFileChange = () => {
    const file = subtitlesFileInputRef.current.files[0]
    if (file) {
      const subtitlesFileURL = URL.createObjectURL(file)
      setSubtitlesFileUrl(subtitlesFileURL)
    }
  }

  return (
    <div style={{ background: "black" }}>
      <div onKeyDown={handleKeyDown} className="player">
        <ReactPlayer
          ref={playerRef}
          playing={isPlaying}
          onProgress={handleProgress}
          url={fileUrl}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
      <div
        className="subtitles"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Line words={currentSubtitle} />
      </div>
      <label for="file">Video</label>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      <label for="file">Subtitles</label>
      <input
        type="file"
        ref={subtitlesFileInputRef}
        onChange={handleSubtitlesFileChange}
      />
    </div>
  )
}

export default App
