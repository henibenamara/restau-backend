module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "",
    DB: "THEDON",
    dialect: "mysql",
    pool: {
    max: 10000,
    min: 0,
    acquire: 300000,
    idle: 100000
    }
    };
