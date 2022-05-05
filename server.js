const express = require("express");
require("dotenv").config();
require("./models");
const { userRoutes } = require("./routes");
const server = express();

server.use(express.json());

const PORT = process.env.PORT || 4000;

server.get("/", (req, res) => {
    res.status(200).send("Working Fine :) ");
});

server.use("/user", userRoutes);

server.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
