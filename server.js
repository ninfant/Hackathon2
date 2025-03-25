import express from "express";
import cors from "cors";
import allRoutes from "./router/allRoutes.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para todas las rutas y dominios
app.use(cors());

// necesario para usar __dirname con ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// my Middlewares
app.use(express.json()); // para JSON body
app.use(express.urlencoded({ extended: true })); // para forms
app.use(express.static(path.join(__dirname, "public"))); // servir HTML/js

// to mount the router
app.use("/api", allRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
