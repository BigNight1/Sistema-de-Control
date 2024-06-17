import { Router } from "express";
import {
  CreateMica,
  DeleteMica,
  FindBrandLenses,
  ReadMicas,
  UpdateMica,
} from "../Controller/MicaController.js";

const router = Router();

router.post("/create_mica", CreateMica);
router.get("/micas", ReadMicas);
router.get("/micas/:brand", FindBrandLenses)
router.put("/updatemica/:id", UpdateMica);
router.delete("/deletemica/:id", DeleteMica);

export default router;
