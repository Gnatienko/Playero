import React from "react"
import Word from "./Word"
import "./Line.css"

const Line = ({ words, translationLanguage }) => {
  return (
    <div className="line">
      {words
        ? words.map((word, index) => (
            <Word text={word} translationLanguage={translationLanguage} />
          ))
        : ""}
    </div>
  )
}

export default Line
