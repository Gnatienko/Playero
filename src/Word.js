import React, { useState } from "react"
import TranslationTooltip from "./TranslationTooltip"

import "./Word.css"

const Word = ({ text, translationLanguage, translationLanguageFrom }) => {
  const [showTranslation, setShowTranslation] = useState(false)

  const handleMouseEnter = () => {
    setShowTranslation(true)
  }

  const handleMouseLeave = () => {
    setShowTranslation(false)
  }

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="content">{text}</div>
      {showTranslation && (
        <div>
          <TranslationTooltip
            text={text}
            translationLanguage={translationLanguage}
            translationLanguageFrom={translationLanguageFrom}
          />
        </div>
      )}
    </div>
  )
}

export default Word
