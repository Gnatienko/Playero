import React, { useState, useEffect, useRef } from "react"
import ReactPlayer from "react-player"
import SubtitlesParser from "subtitles-parser"
import "./App.css"
import FileInput from "./FileInput"
import Subtitles from "./Subtitles"
import LanguageDropDown from "./LanguageDropDown.js"

const App = () => {
  const playerRef = useRef(null)
  const fileInputRef = useRef(null)
  const subtitlesFileInputRef = useRef(null)
  const [translationLanguage, setTranslationLanguage] = useState("uk")

  const [fileUrl, setFileUrl] = useState("")
  const [subtitlesFileUrl, setSubtitlesFileUrl] = useState("")
  const [currentSubtitle, setCurrentSubtitle] = useState([])
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const [parsedSubtitles, setParsedSubtitles] = useState([
    { startTime: 1, text: 1 },
  ])
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullTranslation, setShowFullTranslation] = useState(false)

  const handleMouseEnter = () => {
    setIsPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsPlaying(true)
  }

  useEffect(() => {
    const subtitlesAdjustmentMils = 1 //todo, adjustment not working
    fetch(subtitlesFileUrl)
      .then((response) => response.text())
      .then((data) => {
        const parsedSubtitles = SubtitlesParser.fromSrt(
          data.replace(/<i>|<\/i>|<br\s*\/?>/gi, " "),
          true
        ).map((subtitles) => ({
          ...subtitles,
          startTime: subtitles.startTime + subtitlesAdjustmentMils,
        }))
        setParsedSubtitles(parsedSubtitles)
      })
  }, [subtitlesFileUrl])

  const handleProgress = (state) => {
    const PlayedMillisecond = state.playedSeconds * 1000
    const currentLine = parsedSubtitles.find(
      (subtitle) =>
        subtitle.startTime < PlayedMillisecond &&
        subtitle.endTime > PlayedMillisecond
    )
    setCurrentSubtitle(currentLine ? currentLine.text.split(" ") : [])
    const currentLineIndex =
      parsedSubtitles.findIndex(
        (subtitle) =>
          subtitle.startTime > PlayedMillisecond &&
          subtitle.endTime > PlayedMillisecond
      ) - 1
    setCurrentSubtitleIndex(currentLineIndex)
  }

  const handleKeyDown = (event) => {
    // todo fix cases currentSubtitleIndex -1,0, max+1
    try {
      if (event.key === "," || event.key === "б") {
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

  const handleKeyUp = (event) => {
    try {
      if (
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

  const handleOnChangeLanguage = (event) => {
    setTranslationLanguage(event.target.value)
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      style={{ background: "black" }}
    >
      <div className="player">
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
      <Subtitles
        currentSubtitle={currentSubtitle}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        showTranslation={showFullTranslation}
        translationLanguage={translationLanguage}
      />
      <FileInput
        label="Video"
        inputRef={fileInputRef}
        onChange={handleFileChange}
      />
      <FileInput
        label="Subtitles"
        inputRef={subtitlesFileInputRef}
        onChange={handleSubtitlesFileChange}
      />
      <LanguageDropDown
        translationLanguage={translationLanguage}
        handleOnChangeLanguage={handleOnChangeLanguage}
      />

      <span className="keyword">
        &nbsp;&nbsp;&nbsp; T - translate replica, &nbsp;&lt; - previous replica,
        &nbsp;&gt; - next replica
      </span>
    </div>
  )
}

export default App
