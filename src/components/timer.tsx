const Timer = ({ minutes, seconds }: { minutes: number; seconds: number }) => {
  return (
    <div className="plasmo-flex">
      <div className="plasmo-p-2 plasmo-rounded-box plasmo-text-neutral-content">
        <span className="plasmo-font-mono plasmo-text-5xl plasmo-text-green-500">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>
    </div>
  )
}
export default Timer
