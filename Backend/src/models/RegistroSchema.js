import mongoose from "mongoose";

const ingresoSchema = new mongoose.Schema({
  tipo: { type: String }, // Puede ser "efectivo", "yape", "pli"
  monto: { type: Number },
  detalles: { type: String },
});

const gastoSchema = new mongoose.Schema({
  tipo: { type: String }, // Puede ser "efectivo", "yape", "pli"
  monto: { type: Number },
  detalles: { type: String },
});

const registroSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  ingresos: [ingresoSchema],
  gastos: [gastoSchema],
});

const RegistroModel = mongoose.model("Registro", registroSchema);

export default RegistroModel;
