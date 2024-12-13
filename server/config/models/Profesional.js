import mongoose from "mongoose";

const { Schema } = mongoose;

const profesionalSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["profesional", "admin"],
    default: "profesional",
  },
});

export default mongoose.model("Profesional", profesionalSchema);
