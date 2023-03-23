import _api from "./api"

export const uploadSingle = (data) => _api.post("/upload/single", data)