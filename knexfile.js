// when deploying, uncomment ssl string

require("dotenv").config();

const { DATABASE_URL, PG_CONNECTION_STRING } = process.env;

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
      connectionString: DATABASE_URL || PG_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false },
    },
  },

  // testing: {
  //   ...sharedConfig,
  //   connection: {
  //     connectionString: DATABASE_URL || PG_CONNECTION_STRING,
  //     ssl: { rejectUnauthorized: false },
  //   },
  // },

  production: {
    ...sharedConfig,
    connection: {
      connectionString: DATABASE_URL || PG_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false },
    },
  },
};
