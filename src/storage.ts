import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const getTimerLeft = async () => storage.get("timerLeft")

export const setTimerLeft = async (time: number) =>
  storage.set("timerLeft", time)

export const timerStatus = async () => storage.get("timerStatus")

export default storage
