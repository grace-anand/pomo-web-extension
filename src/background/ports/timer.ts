import type { PlasmoMessaging } from "@plasmohq/messaging"

import storage from "~storage"

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  storage.set("timerStatus", req.body.action)

  setInterval(async () => {
    const time = (await storage.get("timerLeft")) as unknown as number

    if (!time) {
      storage.set("timerLeft", 25 * 60)
    } else {
      res.send({ time: time - 1 })
      storage.set("timerLeft", time - 1)
    }
  }, 1000)
}

export default handler
