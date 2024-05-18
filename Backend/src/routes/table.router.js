import { Router } from "express";
import {
  searchClient,
  create_cliente,
  GetClient,
  GetClients,
  UptdateClient,
  DeleteClient,
} from "../Controller/TableController.js";

const router = Router();

router.get("/search", searchClient)
router.get("/clients", GetClients);
router.get("/client/:id", GetClient);
router.post("/create-client", create_cliente);
router.put("/updateclient/:id", UptdateClient);
router.delete("/deleteclient/:id", DeleteClient);

export default router;
