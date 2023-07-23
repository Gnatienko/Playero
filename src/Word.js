import React from "react"
import Translation from "./Translation"

import "./Word.css"

const Word = ({ text }) => {
  return (
    <div className="tooltip-container">
      <div className="content">{text}</div>
      <div className="tooltip">
        <Translation text={text} />
      </div>
    </div>
  )
}

export default Word
