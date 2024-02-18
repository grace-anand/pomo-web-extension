import type { PlasmoMessaging } from "@plasmohq/messaging"

import storage from "~storage"

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  if (req.body.action === "start") {
    storage.set("timerStatus", "pomo_running")
    return
  } else if (req.body.action === "stop") {
    storage.set("timerStatus", "stopped")
    return
  } else if (req.body.action === "get") {
    if ((await storage.get("timerStatus")) === "pomo_running") {
      const timerInterval = setInterval(async () => {
        const time = (await storage.get("timerLeft")) as unknown as number

        if (!time) {
          if ((await storage.get("timerStatus")) === "pomo_running") {
            storage.set("timerStatus", "break_running")
            await storage.set("timerLeft", 5 * 60)
          } else {
            await storage.set("timerStatus", "pomo_running")
            await storage.set("timerLeft", 25 * 60)
          }
        } else {
          res.send({
            time: time - 1,
            percentage: (time - 1) / (25 * 60),
            status: "pomo_running"
          })
          storage.set("timerLeft", time - 1)
        }
        if ((await storage.get("timerStatus")) === "stopped") {
          clearInterval(timerInterval)
        }
      }, 1000)
    } else if ((await storage.get("timerStatus")) === "break_running") {
      const timerInterval = setInterval(async () => {
        const time = (await storage.get("timerLeft")) as unknown as number

        res.send({
          time: time - 1,
          percentage: (time - 1) / (5 * 60),
          status: "break_running"
        })
        storage.set("timerLeft", time - 1)

        if ((await storage.get("timerStatus")) === "stopped") {
          clearInterval(timerInterval)
        }
      }, 1000)
    }
  }
}

export default handler
