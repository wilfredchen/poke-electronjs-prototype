const startKnex = (app, path, isDev) => {
  return (knex = require("knex")({
    client: "sqlite3",
    connection: {
      filename: path.join(app.getPath("userData"), "database.sqlite"),
    },
    useNullAsDefault: true,
  }));
};

module.exports = startKnex;
