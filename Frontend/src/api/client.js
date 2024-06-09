import axios from "../api/axios.js";

export const createClient = (client) => axios.post("/create-client", client);
export const CountClient = () => axios.get("/clientCount");
export const getClient = (client) => axios.get("/clients", client);
export const getClientId = (id) => axios.get(`/client/${id}`);
export const UpdateClient = (id, client) =>
  axios.put(`/updateclient/${id}`, client);
export const DeleteClient = (id) => axios.delete(`/deleteclient/${id}`);
