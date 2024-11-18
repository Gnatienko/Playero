import React from "react"
import "./FileInput.css"

const FileInput = ({ label, inputRef, onChange }) => {
  return (
    <>
      <input
        className="file"
        type="file"
        id={label}
        ref={inputRef}
        onChange={onChange}
      />
      <label htmlFor={label} className="custom-file-input">
        {label}
      </label>
    </>
  )
}

export default FileInput
