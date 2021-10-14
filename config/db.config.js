if (process.env.NODE_ENV !== 'production') require('dotenv').config();
//PG_HOST = 127.0.0.1

console.log(process.env.DATABASE_URL);
module.exports = {
  development: {
    username: 'ncueriazkjkpja',
    password: 'd75af4515a1ebd8873e2095bcbeaf954023a3b10e477182760e9c06c7aa47e09',
    database: 'db0tdmfmmirl7t',
    host: 'ec2-44-198-204-136.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: process.env.PG_PORT,
    operatorsAliases: 0,
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT,
    operatorsAliases: 0,
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION
      },
    },
  },
};
