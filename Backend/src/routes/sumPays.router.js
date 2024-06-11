import { Router } from "express";
import { SumPaymentsYape ,SumPaymentsCash, SumPaymentsGastos, fetchDailyData, ClientCount} from "../Controller/SumPayments.js";

const router = Router();

router.get("/sumPaymentsYape", SumPaymentsYape);
router.get("/sumPaymentsCash", SumPaymentsCash);
router.get("/sumPaymentsGastos", SumPaymentsGastos);
router.get("/clientCount", ClientCount);
router.get("/dailyData/:day/:month/:year", fetchDailyData); // Nueva ruta para obtener datos diarios con día, mes y año


export default router;
