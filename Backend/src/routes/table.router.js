import { Router } from "express";
import {
  create_cliente,
  GetClient,
  GetClients,
  UptdateClient,
  DeleteClient,
} from "../Controller/TableController.js";

const router = Router();

router.get("/clients", GetClients);
router.get("/client/:id", GetClient);
router.post("/create-client", create_cliente);
router.put("/updateclient/:id", UptdateClient);
router.delete("/deleteclient/:id", DeleteClient);

export default router;
