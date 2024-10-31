import React from "react"
import Line from "./Line"
import "./Subtitles.css"
import TranslationTooltip from "./TranslationTooltip"

const Subtitles = ({
  currentSubtitle,
  setIsPlaying,
  showTranslation,
  translationLanguage,
  translationLanguageFrom,
}) => {
  const combinedCurrentSubtitle = currentSubtitle.join(" ")

  const handleMouseEnter = () => {
    setIsPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsPlaying(true)
  }

  return (
    <div
      className="subtitles"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Line
        words={currentSubtitle}
        translationLanguage={translationLanguage}
        translationLanguageFrom={translationLanguageFrom}
      />
      {showTranslation && (
        <div>
          <TranslationTooltip
            text={combinedCurrentSubtitle}
            translationLanguage={translationLanguage}
            translationLanguageFrom={translationLanguageFrom}
          />
        </div>
      )}
    </div>
  )
}

export default Subtitles
