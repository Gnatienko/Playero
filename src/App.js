// App.js
import React, { useState, useEffect, useRef } from "react"
import ReactPlayer from "react-player"
import SubtitlesParser from "subtitles-parser"
import "./App.css"
import Menu from "./Menu.js"
import Subtitles from "./Subtitles"
import handleKeyDown from "./keyboardHandler.js" // Import the function

const App = () => {
  const playerRef = useRef(null)
  const [translationLanguage, setTranslationLanguage] = useState("en")
  const [translationLanguageFrom, setTranslationLanguageFrom] = useState("auto")
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
    const subtitlesAdjustmentMils = 1 // todo, subs adjustment not working
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

  const handleKeyUp = (event) => {
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

  return (
    <div
      onKeyDown={(event) =>
        handleKeyDown(
          event,
          playerRef,
          parsedSubtitles,
          currentSubtitleIndex,
          setCurrentSubtitle,
          setIsPlaying,
          setShowFullTranslation
        )
      }
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
        translationLanguageFrom={translationLanguageFrom}
      />
      <Menu
        setFileUrl={setFileUrl}
        setSubtitlesFileUrl={setSubtitlesFileUrl}
        translationLanguage={translationLanguage}
        translationLanguageFrom={translationLanguageFrom}
        setTranslationLanguage={setTranslationLanguage}
        setTranslationLanguageFrom={setTranslationLanguageFrom}
      />
    </div>
  )
}

export default App
