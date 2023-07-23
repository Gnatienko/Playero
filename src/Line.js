import React from "react"
import Word from "./Word"
import "./Line.css"

const Line = ({ words }) => {
  return (
    <div className="line">
      {words ? words.map((word, index) => <Word text={word} />) : ""}
    </div>
  )
}

export default Line
