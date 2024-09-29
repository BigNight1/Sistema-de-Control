import mongoose from "mongoose";

const micaSchema = new mongoose.Schema({
  marca: { type: String },
  modelo: { type: String },
  simple: { type: Number },
  completo: { type: Number },
  posicion: { type: Number }, // Campo para mantener el orden
});

const micaModel = mongoose.model("Mica", micaSchema);

export default micaModel;
