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
        <option value="en">en</option>
        <option value="uk">ua</option>
        <option value="sp">sp</option>
        <option value="auto">auto</option>
      </select>
    </>
  )
}

export default LanguageDropDown
