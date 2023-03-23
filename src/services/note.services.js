import _api from "./api"

export const listNote = () => _api.get("/note/list")
export const getById = (noteID) => _api.get(`/note/${noteID}`)
export const createNote = (payLoad) => _api.post("/note/create", payLoad)
export const deleteNote = (noteID) => _api.delete(`/note/${noteID}/delete`)
export const editNote = (noteID, payload) => _api.patch(`/note/${noteID}/edit`, payload)