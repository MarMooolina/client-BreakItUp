import _api from "./api"

export const loginService = (data) => _api.post("/auth/login", data)
export const signupService = (data) => _api.post("/auth/signup", data)
export const verifyService = () => _api.get("/auth/verify")

