module.exports = {
  HOST: "ec2-44-198-204-136.compute-1.amazonaws.com",
  USER: "db0tdmfmmirl7t",
  PASSWORD: "d75af4515a1ebd8873e2095bcbeaf954023a3b10e477182760e9c06c7aa47e09",
  DB: "db0tdmfmmirl7t",
  dialect: "postgres",
  "dialectOptions": {
    "ssl": {"require":true }
  },
  "port": 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
