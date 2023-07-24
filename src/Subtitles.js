import React from "react"
import Line from "./Line"
import "./Subtitles.css"
import TranslationTooltip from "./TranslationTooltip"

const Subtitles = ({
  currentSubtitle,
  handleMouseEnter,
  handleMouseLeave,
  showTranslation,
}) => {
  const combinedCurrentSubtitle = currentSubtitle.join(" ")
  return (
    <div
      className="subtitles"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Line words={currentSubtitle} />
      {showTranslation && (
        <div>
          <TranslationTooltip text={combinedCurrentSubtitle} />
        </div>
      )}
    </div>
  )
}

export default Subtitles
