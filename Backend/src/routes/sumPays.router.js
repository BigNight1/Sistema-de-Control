import { Router } from "express";
import { SumPaymentsYape ,SumPaymentsCash} from "../Controller/SumPayments.js";

const router = Router();

router.get("/sumPaymentsYape", SumPaymentsYape);
router.get("/sumPaymentsCash", SumPaymentsCash);

export default router;
