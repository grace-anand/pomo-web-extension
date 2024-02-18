import { usePort } from "@plasmohq/messaging/hook"

const StartStopButton = () => {
  const timerPort = usePort("timer")

  const timer = async (action: "start" | "stop") => {
    timerPort.send({
      action
    })
  }
  return (
    <button
      onClick={() => timer("start")}
      className="plasmo-flex plasmo-flex-row plasmo-items-center plasmo-px-4 plasmo-py-2 plasmo-text-sm plasmo-rounded-lg plasmo-transition-all plasmo-border-none
      plasmo-shadow-lg hover:plasmo-shadow-md
      active:plasmo-scale-105 plasmo-bg-slate-50 hover:plasmo-bg-slate-100 plasmo-text-slate-800 hover:plasmo-text-slate-900">
      Start
    </button>
  )
}

export default StartStopButton
