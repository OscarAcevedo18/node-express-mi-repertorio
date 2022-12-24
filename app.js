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

//  Creacion Ruta post
app.post("/songs", async (req, res) => {
  try {
  const song = req.body;
  if (song.titulo === "") {
    return;
  }

  if (song.artista === "") {
    return;
  }

  if (song.tono === "") {
    return;
  }
  const songs = JSON.parse(
    await fsPromises.readFile("repertorio.json", "utf-8")
  );
  songs.push(song);
  await fsPromises.writeFile("repertorio.json", JSON.stringify(songs));
  res.send("Canción agregada con éxito!");
  }catch (error) {
    res.send({status: 'error', data: 'error interno del servidor'})
  }
});

//   DELETE
app.delete("/songs/:id", async (req, res) => {
  try {
  const { id } = req.params;
  const songs = JSON.parse(await fsPromises.readFile("repertorio.json"));
  const index = songs.findIndex((p) => p.id == id);
  songs.splice(index, 1);
  await fsPromises.writeFile("repertorio.json", JSON.stringify(songs));
  return res.send("Canción eliminada con éxito");
  } catch (error) {
    res.send({status: 'error', data: 'Error interno del Servidor'})
  }
});