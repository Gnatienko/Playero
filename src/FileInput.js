import React from "react"

const FileInput = ({ label, inputRef, onChange }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input type="file" ref={inputRef} onChange={onChange} />
    </>
  )
}

export default FileInput
