require("dotenv").config();

const { PG_CONNECTION_STRING } = process.env;

const sharedConfig = {
  client: "pg",
  migrations: {
    directory: "./data/migrations",
  },
  seeds: { directory: "./data/seeds" },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: PG_CONNECTION_STRING,
  },

  testing: {
    ...sharedConfig,
    connection: PG_CONNECTION_STRING,
  },

  production: {
    ...sharedConfig,
    connection: PG_CONNECTION_STRING,
  },
};
