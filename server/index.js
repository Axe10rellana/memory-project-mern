//express
import express from "express";

//body-parser
import bodyParser from "body-parser";

//mongoose
import mongoose from "mongoose";

//cors
import cors from "cors";

//routes
import postsRouter from "./routes/posts.routes.js";
import userRouter from "./routes/users.routes.js";

//dotenv
import dotenv from "dotenv";

//variables
dotenv.config();
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//rutas
app.use("/posts", postsRouter);
app.use("/user", userRouter);

//conexion con la base de datos y ejecucion del servidor
mongoose
  .connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.info(`El servidor esta ejecutandose en el puerto: ${PORT}`)
    )
  )
  .catch((error) => console.error(error.message));
