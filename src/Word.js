import React, { useState } from "react"
import Translation from "./Translation"

import "./Word.css"

const Word = ({ text }) => {
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
        <div className="tooltip">
          <Translation text={text} />
        </div>
      )}
    </div>
  )
}

export default Word
