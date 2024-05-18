import axios from "../api/axios.js"

export const SearchName = (terms) => axios.get("/search", {params: {terms}}) 