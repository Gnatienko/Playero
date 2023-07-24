import React from "react"
import Line from "./Line"
import "./Subtitles.css"

const Subtitles = ({ currentSubtitle, handleMouseEnter, handleMouseLeave }) => {
  const handleKeyDown = (event) => {
    console.log(1)
  }
  return (
    <div
      onKeyDown={handleKeyDown}
      className="subtitles"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Line words={currentSubtitle} />
    </div>
  )
}

export default Subtitles
