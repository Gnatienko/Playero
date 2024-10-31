import React, { useEffect, useState } from "react"
import { ReactComponent as DoubleArrowDown } from "./assets/double-arrow-down-6.svg"
import "./BlinkingArrow.css"

const BlinkingArrow = () => {
  const [showArrow, setShowArrow] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setShowArrow(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {}
  }, [])

  if (!showArrow) return null
  return (
    <div className="blinking-arrow">
      <DoubleArrowDown className="arrow-icon" />
    </div>
  )
}

export default BlinkingArrow
