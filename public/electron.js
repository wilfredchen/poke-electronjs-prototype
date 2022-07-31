const electron = require("electron");

const { app, ipcMain, protocol, Menu } = electron;

const startKnex = require("./app/knex");
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");
const MainWindow = require("./app/main_window");

//======================//
//knex sqlite connection//
//======================//
const knex = startKnex(app, path, isDev);

//=============================//
//image path with safe protocol//
//=============================//
let imagePath =
  "safe-protocol://" + path.join(app.getPath("userData"), "images");
//================================//
//image path without safe protocol//
//================================//
let imagePathUnsafe = path.join(app.getPath("userData"), "images");

let mainWindow;

app.on("ready", () => {
  //on ready create new windows n do necessary stuffs.
  mainWindow = new MainWindow(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`,
    knex,
    imagePathUnsafe
  );
  mainWindow.on("closed", () => app.quit());
  //set custom menu
  mainWindow.setMenu(app, mainWindow);
  //=====================
  //safe protocol for image - e.g safe-protocol://
  //=====================
  const protocolName = "safe-protocol";
  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, "");
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      console.error(error);
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

//========================
//Pokemon Sqlite Functions
//========================
ipcMain.on("listAllPokemon", () => {
  let result = knex.select("*").from("Pokemon");
  result.then(function (rows) {
    mainWindow.webContents.send("listAllPokemonResult", rows);
  });
});

ipcMain.on("AddPokemon", (event, object) => {
  knex("pokemon")
    .insert({
      no: object.no,
      name: object.name,
      desc: object.desc,
      type1: object.type1,
      type2: object.type2,
      path: imagePath + "/" + object.fileName,
      deletePath: imagePathUnsafe + "/" + object.fileName,
      preloaded: "false",
    })
    .then(function (result) {
      fs.copyFileSync(
        object.originPath,
        imagePathUnsafe + "/" + object.fileName
      );
      mainWindow.webContents.send("AddPokemonSuccess", "success");
    });
});

ipcMain.on("DeletePokemon", (event, object) => {
  knex("pokemon")
    .where("id", object.id)
    .del()
    .then(function (result) {
      if (object.preloaded === "false") {
        fs.unlinkSync(object.path);
      }
      mainWindow.webContents.send("DeletePokemonSuccess", "success");
    });
});
