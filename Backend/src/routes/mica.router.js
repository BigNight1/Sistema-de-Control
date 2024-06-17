import { Router } from "express";
import {
  CreateMica,
  DeleteMica,
  ReadMicas,
  UpdateMica,
} from "../Controller/MicaController.js";

const router = Router();

router.post("/create_mica", CreateMica);
router.get("/micas", ReadMicas);
router.put("/updatemica/:id", UpdateMica);
router.delete("/deletemica/:id", DeleteMica);

export default router;
