const express = require("express");
require("dotenv").config();
var cors = require("cors");

require("./models");
const { userRoutes } = require("./routes");

const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 4000;

server.get("/", (req, res) => {
    res.status(200).send("Working Fine :) ");
});

server.use("/api/user", userRoutes);

server.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
