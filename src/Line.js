import React from "react"
import Word from "./Word"

const Line = ({ words }) => {
  return (
    <div>{words ? words.map((word, index) => <Word text={word} />) : ""}</div>
  )
}

export default Line
