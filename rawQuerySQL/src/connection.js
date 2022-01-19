const Sequelize = require('sequelize');

const db = {
    // "host": "",
    // "username": "",
    // "password": "",
    // "database": "",
    // "port": 3306,
    // "dialect": "mysql",
    // "timezone": "-03:00"
};

const sequelize = new Sequelize(
    db.database,
    db.username,
    db.password, {
    host: db.host,
    port: db.port,
    dialect: db.dialect
}
);

module.exports = { sequelize };
