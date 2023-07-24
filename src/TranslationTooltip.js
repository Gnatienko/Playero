import React, { useState, useEffect } from "react"
import "./TranslationTooltip.css"

const TranslationTooltip = ({ text }) => {
  const [translation, setTranslation] = useState(null)

  useEffect(() => {
    async function translateWord(word) {
      const language = "auto"
      try {
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${language}&tl=uk&dt=t&q=${encodeURIComponent(
            word
          )}`
        )
        const data = await response.json()
        const translatedText = data?.[0]?.[0]?.[0]
        setTranslation(translatedText)
      } catch (error) {
        console.error("Error translating word:", error)
        setTranslation(null)
      }
    }

    translateWord(text)
  }, [text])

  return <div className="tooltip">{translation}</div>
}

export default TranslationTooltip
