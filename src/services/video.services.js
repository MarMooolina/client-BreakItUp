import _api from "./api"

export const randomVideo = () => _api.get("/video/random")
export const listVideo = () => _api.get("/video/list")
export const videoCtrl = (payLoad) => _api.post(`/video/${payLoad.videoId}`, payLoad)
