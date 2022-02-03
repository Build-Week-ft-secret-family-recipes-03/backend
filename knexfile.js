require("dotenv").config();

const { DATABASE_URL } = process.env;

const sharedConfig = {
  client: "pg",
  migrations: {
    directory: "./data/migrations",
  },
  seeds: { directory: "./data/seeds" },
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: DATABASE_URL,
  },

  testing: {
    ...sharedConfig,
    connection: DATABASE_URL,
  },

  production: {
    ...sharedConfig,
    connection: DATABASE_URL,
  },
};
