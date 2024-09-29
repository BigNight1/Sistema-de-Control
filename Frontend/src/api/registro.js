import axios from "./axios.js"

export const GetRegistros = () => axios.get("/registros")
export const GetTotales = () => axios.get("/totales")

