// server.js
import express from "express";
import fetch from "node-fetch"; // precisa instalar com: npm install node-fetch
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

//  IP do ESP32 — coloque o seu IP real aqui
const ESP_IP = "http://192.168.0.105";

// Servir arquivos estáticos (HTML, CSS, imagens)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/alerta", async (req, res) => {
  try {
    await fetch(`${ESP_IP}/alerta`);
    res.type("text/plain").send(" Alerta enviado ao ESP!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao enviar alerta ao ESP.");
  }
});

//  Rota para GPS
app.get("/gps", (req, res) => {
  res.redirect(`${ESP_IP}/gps`);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Node ativo em: http://localhost:${PORT}`);
});
