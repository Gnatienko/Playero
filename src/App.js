// App.js
import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"
import "./App.css"
import Menu from "./Menu/Menu.js"
import Subtitles from "./Subtitles/Subtitles.js"
import BlinkingArrow from "./BlinkingArrow"
import { handleKeyDown, handleKeyUp } from "./handleKeyboard.js"
import useSubtitles from "./hooks/useSubtitles"
import handleProgress from "./handleProgress"
import useSavedTranslation from "./hooks/useSavedTranslation"

const App = () => {
  const playerRef = useRef(null)
  const [translationLanguage, setTranslationLanguage] = useState("en")
  const [translationLanguageFrom, setTranslationLanguageFrom] = useState("auto")
  const [fileUrl, setFileUrl] = useState("")
  const [subtitlesFileUrl, setSubtitlesFileUrl] = useState("")
  const [currentSubtitle, setCurrentSubtitle] = useState([])
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullTranslation, setShowFullTranslation] = useState(false)
  const parsedSubtitles = useSubtitles(subtitlesFileUrl)
  useSavedTranslation(setTranslationLanguage, setTranslationLanguageFrom)

  return (
    <div
      className="Main"
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
      onKeyUp={(event) =>
        handleKeyUp(event, setIsPlaying, setShowFullTranslation)
      }
      style={{ background: "black" }}
    >
      <div className="player">
        <ReactPlayer
          ref={playerRef}
          playing={isPlaying}
          onProgress={(state) =>
            handleProgress(
              state,
              parsedSubtitles,
              setCurrentSubtitle,
              setCurrentSubtitleIndex
            )
          }
          url={fileUrl}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
      <BlinkingArrow />
      <Subtitles
        currentSubtitle={currentSubtitle}
        setIsPlaying={setIsPlaying}
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
