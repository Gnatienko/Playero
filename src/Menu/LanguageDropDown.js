import React from "react"
import "./LanguageDropDown.css"

const languages = {
  en: "English",
  uk: "українська",
  es: "español",
  auto: "auto",
}

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
        {Object.entries(languages).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageDropDown
