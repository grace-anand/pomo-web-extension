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
      timerPort.send({ action: "get" })
      setStarted(true)
    }
  }, [])

  const pomoTime = timerPort.data?.status === "pomo_running"
  const hue = pomoTime ? timerPort.data?.percentage * 120 : 240

  if (window.location.href === "https://www.youtube.com/" && pomoTime) {
    document.getElementById("primary")?.remove()
  }

  if (!timerPort.data?.time) return null

  return (
    <div
      style={{ color: `hsl(${hue}, 100%, 50%)` }}
      className="plasmo-z-50 plasmo-fixed plasmo-top-32 plasmo-right-8">
      <span className="plasmo-text-center">
        {pomoTime ? "Time left to work!!!" : "Break time"}
      </span>
      {
        <Timer
          minutes={Math.floor(timerPort.data?.time / 60) || 0}
          seconds={timerPort.data?.time % 60 || 0}
        />
      }
    </div>
  )
}

export default PlasmoOverlay
