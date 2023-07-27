import React, { useState, useEffect } from "react"
import "./TranslationTooltip.css"

const TranslationTooltip = ({ text, translationLanguage }) => {
  const [translation, setTranslation] = useState(null)

  useEffect(() => {
    async function translateWord(word) {
      const language = "auto"
      try {
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${language}&tl=${translationLanguage}&dt=t&q=${encodeURIComponent(
            word
          )}`
        )
        const data = await response.json()

        const translatedText = data?.[0]
          .map((secondLevelArray) => {
            return secondLevelArray[0]
          })
          .join(" ")
        setTranslation(translatedText)
      } catch (error) {
        console.error("Error translating word:", error)
        setTranslation(null)
      }
    }

    translateWord(text)
  }, [text, translationLanguage])

  return <div className="tooltip">{translation}</div>
}

export default TranslationTooltip
