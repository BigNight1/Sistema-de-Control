import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    fecha: { type: String },
    nombre: { type: String, required: true },
    numero: {
      type: Number,
      validate: {
        validator: function (v) {
          return v.toString().length <= 9; 
        },
        message: (props) => `${props.value} tiene más de 9 dígitos`,
      },
    },
    adelanto : { type: Number},
    trabajo: { type: String },
    efectivo: { type: Number, default: 0 },
    yape: { type: Number, default: 0 },
    precio: {type: Number , default: 0},
    gastos : {type: Number , default: 0},
    estado: { type: String },
    hora: {type: String}
  }
  // {
  //   timestamps: true,
  // }
);

const clientModel = mongoose.model("Client", clientSchema);

export default clientModel;
