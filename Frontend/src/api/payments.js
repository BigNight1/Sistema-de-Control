import axios from "../api/axios.js"

export const SumPaymentsyape = () => axios.get("/sumPaymentsYape")
export const SumPaymentscash = () => axios.get("/sumPaymentsCash")