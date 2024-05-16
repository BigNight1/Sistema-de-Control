import axios from "../api/axios.js";

export const createClient = (client) => axios.post("/create-client", client);
export const getClient = (client) => axios.get("/clients", client);
export const getClientId = (id) => axios.get(`/client/${id}`, client);
export const UpdateClient = (client) =>
  axios.put(`/updateclient/${client._id}`, client);
export const DeleteClient = (id) => axios.delete(`/deleteclient/${id}`);
