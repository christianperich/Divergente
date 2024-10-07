import mongoose from "mongoose";

const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apoderado: { type: String, required: true },
});

export default mongoose.model("Usuario", usuarioSchema);
