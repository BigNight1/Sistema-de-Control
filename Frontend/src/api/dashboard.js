import axios from "./axios.js";

export const SumPaymentsyape = () => axios.get("/sumPaymentsYape");
export const SumPaymentscash = () => axios.get("/sumPaymentsCash");
export const SumPaymentsGastos = () => axios.get("/sumPaymentsGastos");
export const FetchDailyData = (day, month, year) => axios.get(`/dailyData/${day}/${month}/${year}`);
export const CountClient = () => axios.get("/clientCount");
