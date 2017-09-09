// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'todo',
      user: 'root',
      password: 'secret',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'todo',
      user: 'root',
      password: 'secret',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'todo',
      user: 'root',
      password: 'secret',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
  },
};
