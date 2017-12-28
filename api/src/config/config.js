module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'traqsuite',
    user: process.env.DB_USER || 'traqsuite',
    password: process.env.DB_PASSWORD || 'traqsuite',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './traqsuite.sqlite'
    }
  }
}
