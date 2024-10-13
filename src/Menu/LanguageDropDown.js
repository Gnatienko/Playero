import React from "react"
import "./LanguageDropDown.css"

const LanguageDropDown = ({
  translationLanguage,
  handleOnChangeLanguage,
  title,
}) => {
  return (
    <div>
      <label className="language-label">{title}</label>
      <select
        id="language"
        className="language-select"
        value={translationLanguage}
        onChange={handleOnChangeLanguage}
      >
        <option value="en">English</option>
        <option value="uk">українська</option>
        <option value="es">español</option>
        <option value="auto">auto</option>
      </select>
    </div>
  )
}

export default LanguageDropDown
