import React, { useRef } from "react"
import FileInput from "./FileInput"
import LanguageDropDown from "./LanguageDropDown"
import Legend from "./Legend"
import "./Menu.css"
import Cookies from "js-cookie"

const Menu = ({
  setFileUrl,
  setSubtitlesFileUrl,
  translationLanguage,
  translationLanguageFrom,
  setTranslationLanguage,
  setTranslationLanguageFrom,
}) => {
  const videoFileInputRef = useRef(null)
  const subtitlesFileInputRef = useRef(null)

  const handleFileChange = () => {
    const file = videoFileInputRef.current.files[0]
    if (file) {
      const fileURL = URL.createObjectURL(file)
      setFileUrl(fileURL)
    }
  }

  const handleSubtitlesFileChange = () => {
    const file = subtitlesFileInputRef.current.files[0]
    if (file) {
      const subtitlesFileURL = URL.createObjectURL(file)
      setSubtitlesFileUrl(subtitlesFileURL)
    }
  }

  const handleOnChangeLanguage = (event) => {
    setTranslationLanguage(event.target.value)
    Cookies.set("translationLanguage", event.target.value, {
      expires: 100,
    })
  }

  const handleOnChangeLanguageFrom = (event) => {
    setTranslationLanguageFrom(event.target.value)
    Cookies.set("translationLanguageFrom", event.target.value, {
      expires: 100,
    })
  }

  return (
    <div className="menu">
      <div className="elements-container">
        <FileInput
          label="Video"
          inputRef={videoFileInputRef}
          onChange={handleFileChange}
        />
        <FileInput
          label="Subtitles"
          inputRef={subtitlesFileInputRef}
          onChange={handleSubtitlesFileChange}
        />

        <LanguageDropDown
          title="translation from"
          translationLanguage={translationLanguageFrom}
          handleOnChangeLanguage={handleOnChangeLanguageFrom}
        />
        <LanguageDropDown
          title="translation to"
          translationLanguage={translationLanguage}
          handleOnChangeLanguage={handleOnChangeLanguage}
        />
      </div>
      <Legend />
    </div>
  )
}

export default Menu
