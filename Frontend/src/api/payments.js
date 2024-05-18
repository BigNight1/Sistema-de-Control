import axios from "../api/axios.js"

export const SumPaymentsyape = (yape) => axios.get("/sumPaymentsYape", yape)

export const SumPaymentscash = (cash) => axios.get("/sumPaymentsCash", cash)