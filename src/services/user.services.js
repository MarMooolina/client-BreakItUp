import _api from "./api"

export const editProfile = (data) => _api.patch("/user/edit", data)