import express from "express";
import { urlencoded, json } from "body-parser";
import { INTERNAL_LINKS } from "./src/enum";
require("dotenv").config();
const server = express();
const PORT = process.env.PORT;

server.use(urlencoded({ extended: true }));
server.use(json());

require("./src/config/dbConnection");

import { blogRoute, commentRoute } from "./src/routes";

server.use(INTERNAL_LINKS.USERS, blogRoute);
server.use(INTERNAL_LINKS.USERS, commentRoute);

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
