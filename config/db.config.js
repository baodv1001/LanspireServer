module.exports = {
  connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
