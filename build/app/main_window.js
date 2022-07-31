const electron = require("electron");
const { BrowserWindow } = electron;
const fs = require("fs");

class MainWindow extends BrowserWindow {
  constructor(url, knex, imagePathUnsafe) {
    super({
      width: 900,
      height: 680,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    this.loadURL(url);
    //create image folder if it doesn't exist
    if (!fs.existsSync(imagePathUnsafe)) {
      fs.mkdirSync(imagePathUnsafe);
    }
    //create table if it doesn't exist
    knex.schema.hasTable("Pokemon").then(function (exists) {
      if (!exists) {
        knex.schema
          .createTable("Pokemon", function (table) {
            table.increments("id").primary();
            table.integer("no");
            table.string("name");
            table.string("desc");
            table.string("type1");
            table.string("type2");
            table.string("path");
            table.string("deletePath");
            table.string("preloaded");
          })
          .then((result) => {
            //if no data in pokemon table, insert these initial datas
            knex
              .select("*")
              .from("Pokemon")
              .then((result) => {
                if (result.length === 0) {
                  return knex("Pokemon").insert([
                    {
                      no: 1,
                      name: "Bulbasaur",
                      desc:
                        "There is a plant seed on its back right from the day this POKéMON is born. The seed slowly grows larger.",
                      type1: "grass",
                      type2: "poison",
                      path: "./images/pokemon/bulbasaur.jpg",
                      deletePath: "",
                      preloaded: "true",
                    },
                    {
                      no: 2,
                      name: "Ivysaur",
                      desc:
                        "If the bud on its back starts to smell sweet, it is evidence that the large flower will soon bloom.",
                      type1: "grass",
                      type2: "poison",
                      path: "./images/pokemon/ivysaur.jpg",
                      deletePath: "",
                      preloaded: "true",
                    },
                  ]);
                }
              });
          });
      }
    });
  }
}

module.exports = MainWindow;
