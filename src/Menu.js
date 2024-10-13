import React, { useRef } from "react"
import FileInput from "./FileInput"
import LanguageDropDown from "./LanguageDropDown"
import Legend from "./Legend"

const Menu = ({
  setFileUrl,
  subtitlesFileInputRef,
  handleSubtitlesFileChange,
  translationLanguage,
  translationLanguageFrom,
  handleOnChangeLanguage,
  handleOnChangeLanguageFrom,
}) => {
  const VideoFileInputRef = useRef(null)

  const handleFileChange = () => {
    const file = VideoFileInputRef.current.files[0]
    if (file) {
      const fileURL = URL.createObjectURL(file)
      setFileUrl(fileURL)
    }
  }
  return (
    <div className="menu">
      <FileInput
        label="Video"
        inputRef={VideoFileInputRef}
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
      <Legend />
    </div>
  )
}

export default Menu
