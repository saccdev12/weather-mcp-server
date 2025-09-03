import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;

// Ruta raíz para comprobar que funciona
app.get("/", (req, res) => {
  res.send("🌦️ Servidor MCP de Clima funcionando");
});

// Endpoint de clima: /weather?city=Montevideo
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "Falta el parámetro city" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );
    const data = await response.json();
    res.json({
      ciudad: data.name,
      clima: data.weather[0].description,
      temperatura: `${data.main.temp} °C`
    });
  } catch (err) {
    res.status(500).json({ error: "Error al consultar API" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});