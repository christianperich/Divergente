import mongoose from "mongoose";

const { Schema } = mongoose;

const sesionSchema = new Schema({
  tipo: { type: String, required: true },
  fecha: { type: Date, required: true },
  boleta: { type: Boolean, default: false },
  pagadoDivergente: { type: Boolean, default: false },
  pagadoProfesional: { type: Boolean, default: false },
  profesional: { type: Schema.Types.ObjectId, ref: "Profesional" },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
});

export default mongoose.model("Sesion", sesionSchema);
