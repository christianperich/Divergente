import mongoose from "mongoose";

const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apoderado: { type: String, required: true },
  tarifaDiferenciada: { type: Boolean, default: false },
  montoProfesional: { type: Number, default: 12500 },
  montoDivergente: { type: Number, default: 5000 },
});

export default mongoose.model("Usuario", usuarioSchema);
