import _api from "./api"

export const quoteRandom = () => _api.get("/quote/random")
export const listQuotes = () => _api.get("/quote/list")
export const quoteCtrl = (payLoad) => _api.post("/quote/ctrl", payLoad)

