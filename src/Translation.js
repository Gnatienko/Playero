import React, { useState } from "react"

const Translation = ({ text }) => {
  const [translation, setTranslation] = useState(null)

  async function translateWord(word) {
    const language = "en"
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${language}&tl=uk&dt=t&q=${encodeURIComponent(
        word
      )}`
    )
    const data = await response.json()
    const translation = data[0][0][0]
    setTranslation(translation)
  }

  translateWord(text)

  return <div className="content">{translation}</div>
}
export default Translation
