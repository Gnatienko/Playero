import React from "react"
import Line from "./Line"
import "./Subtitles.css"

const Subtitles = ({ currentSubtitle, handleMouseEnter, handleMouseLeave }) => {
  return (
    <div
      className="subtitles"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Line words={currentSubtitle} />
    </div>
  )
}

export default Subtitles
