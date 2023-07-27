import React from "react"
import Line from "./Line"
import "./Subtitles.css"
import TranslationTooltip from "./TranslationTooltip"

const Subtitles = ({
  currentSubtitle,
  handleMouseEnter,
  handleMouseLeave,
  showTranslation,
  translationLanguage,
}) => {
  const combinedCurrentSubtitle = currentSubtitle.join(" ")
  return (
    <div
      className="subtitles"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Line words={currentSubtitle} translationLanguage={translationLanguage} />
      {showTranslation && (
        <div>
          <TranslationTooltip
            text={combinedCurrentSubtitle}
            translationLanguage={translationLanguage}
          />
        </div>
      )}
    </div>
  )
}

export default Subtitles
