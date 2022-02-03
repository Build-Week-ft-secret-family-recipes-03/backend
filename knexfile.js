require("dotenv").config();

const { DATABASE_URL } = process.env;

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
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  },

  testing: {
    ...sharedConfig,
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  },

  production: {
    ...sharedConfig,
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  },
};
