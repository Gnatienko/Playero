import React from "react"
import "./FileInput.css"

const FileInput = ({ label, inputRef, onChange }) => {
  return (
    <>
      <input
        type="file"
        id={label}
        ref={inputRef}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <label htmlFor={label} className="custom-file-input">
        {label}
      </label>
    </>
  )
}

export default FileInput
