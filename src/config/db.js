import mongoose from "mongoose";

export const conectar = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB conectada");
  } catch (error) {
    console.log("Error DB", error);
  }
};
