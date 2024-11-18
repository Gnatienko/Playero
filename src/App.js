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
  const [fileUrl, setFileUrl] = useState(
    "https://pub-ad085a2e56b1496b854a318cdc5ec8f7.r2.dev/Friends.S01E01.720p.BluRay.Dual.Audio.x264-PSYCHD_x264.mp4"
  )
  const [subtitlesFileUrl, setSubtitlesFileUrl] = useState(
    "https://pub-ad085a2e56b1496b854a318cdc5ec8f7.r2.dev/friends.s01e01.720p.bluray.x264-psychd.srt"
  )
  const [currentSubtitle, setCurrentSubtitle] = useState([])
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFullTranslation, setShowFullTranslation] = useState(false)
  const parsedSubtitles = useSubtitles(subtitlesFileUrl)
  useSavedTranslation(setTranslationLanguage, setTranslationLanguageFrom)

  return (
    <div
      className="main"
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
