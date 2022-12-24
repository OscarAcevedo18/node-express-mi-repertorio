const express = require("express");
const app = express();
const fsPromises = require("fs/promises");
const cors = require("cors");
app.listen(3000, console.log("¡Servidor encendido!"));

app.use(cors());

app.use(express.json());

app.get("/songs", async (req, res) => {
  const loadSongs = JSON.parse(
    await fsPromises.readFile("repertorio.json", "utf-8")
  );
  res.json(loadSongs);
});

