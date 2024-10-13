import React from "react"
//import "./FileInput.css"

const LanguageDropDown = ({
  translationLanguage,
  handleOnChangeLanguage,
  title,
}) => {
  return (
    <>
      <label>{title}</label>
      <select
        id="language"
        value={translationLanguage}
        onChange={handleOnChangeLanguage}
      >
        <option value="en">English</option>
        <option value="uk">українська</option>
        <option value="es">español</option>
        <option value="auto">auto</option>
      </select>
    </>
  )
}

export default LanguageDropDown
