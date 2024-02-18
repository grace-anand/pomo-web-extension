import cssText from "data-text:~style.css"
import { useEffect, useState } from "react"

import { usePort } from "@plasmohq/messaging/hook"

import Timer from "~components/timer"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const timerPort = usePort("timer")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) {
      timerPort.send({ action: "start" })
      setStarted(true)
    }
  }, [])

  return (
    <div className="plasmo-z-50 plasmo-fixed plasmo-top-32 plasmo-right-8">
      {timerPort.data?.time && (
        <Timer
          minutes={Math.floor(timerPort.data?.time / 60) || 0}
          seconds={timerPort.data?.time % 60 || 0}
        />
      )}
    </div>
  )
}

export default PlasmoOverlay
