const Mysql = require("sync-mysql");

const connection = new Mysql({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog",
});

module.exports = connection;
