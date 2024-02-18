import { usePort } from "@plasmohq/messaging/hook"

const StartStopButton = () => {
  const timerPort = usePort("timer")

  const timer = async (action: "start" | "stop") => {
    timerPort.send({
      action
    })
  }
  return (
    <div className="plasmo-flex plasmo-gap-1">
      <button
        onClick={() => timer("start")}
        className="plasmo-flex plasmo-flex-row plasmo-items-center plasmo-px-4 plasmo-py-2 plasmo-text-sm plasmo-rounded-lg plasmo-transition-all plasmo-border-none
      plasmo-shadow-lg hover:plasmo-shadow-md
      active:plasmo-scale-105 plasmo-bg-green-400 hover:plasmo-bg-green-500 plasmo-text-slate-800 hover:plasmo-text-slate-900">
        Start
      </button>
      <button
        onClick={() => timer("stop")}
        className="plasmo-flex plasmo-flex-row plasmo-items-center plasmo-px-4 plasmo-py-2 plasmo-text-sm plasmo-rounded-lg plasmo-transition-all plasmo-border-none
      plasmo-shadow-lg hover:plasmo-shadow-md
      active:plasmo-scale-105 plasmo-bg-red-400 hover:plasmo-bg-red-500 plasmo-text-slate-800 hover:plasmo-text-slate-900">
        Stop
      </button>
    </div>
  )
}

export default StartStopButton
