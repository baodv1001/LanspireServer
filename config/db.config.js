module.exports = {
  HOST: "ec2-18-214-214-252.compute-1.amazonaws.com",
  USER: "uqwhqbhvyuwdos",
  PASSWORD: "41f45c418aac3b47346db03d75c733c7acb68b261bdba1057eca7971156ca2f5",
  DB: "d2bd8ddl8rtt76",
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
