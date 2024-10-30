import React from "react"
import Word from "./Word"
import "./Line.css"

const Line = ({ words, translationLanguage, translationLanguageFrom }) => {
  return (
    <div className="line">
      {words
        ? words.map((word, index) => (
            <Word
              text={word}
              translationLanguage={translationLanguage}
              translationLanguageFrom={translationLanguageFrom}
            />
          ))
        : ""}
    </div>
  )
}

export default Line
