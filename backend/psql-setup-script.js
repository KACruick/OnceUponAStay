const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});
/*
You will also be using PostgresQL in production rather 
than SQLite3 as a SQL database management system. Recall that SQLite3 is 
supposed to be used ONLY in development. PostgresQL is a production-level 
database management system.
*/