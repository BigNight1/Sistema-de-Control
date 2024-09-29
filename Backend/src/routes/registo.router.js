import express from "express";
import {
  actualizarIngreso,
  createRegistro,
  actualizarGasto,
  agregarIngreso,
  agregarGasto,
  obtenerRegistros,
  obtenerTotalesPorFecha,
} from "../Controller/RegistoController.js";

const router = express.Router();

router.get("/registros", obtenerRegistros); // Obtener todos los registros
router.post("/create_registro", createRegistro);
router.put("/agregar_ingreso", agregarIngreso);
router.put("/agregar_gasto", agregarGasto);
router.put("/:registroId/ingreso/:ingresoId", actualizarIngreso);
router.put("/:registroId/gasto/:gastoId", actualizarGasto);
router.get("/totales", obtenerTotalesPorFecha); // Nueva ruta para obtener los totales por fecha


export default router;
