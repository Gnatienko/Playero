import React from "react"
//import "./FileInput.css"

const LanguageDropDown = ({ translationLanguage, handleOnChangeLanguage }) => {
  return (
    <>
      <label>translation</label>
      <select
        id="language"
        value={translationLanguage}
        onChange={handleOnChangeLanguage}
      >
        <option value="en">en</option>
        <option value="uk">ua</option>
      </select>
    </>
  )
}

export default LanguageDropDown
