require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

const route = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Use DB
const db = require("./config/db");
db.connect();

app.listen(port, () => console.log(`Server is listening on port ${port}`));

// Use Route
route(app);
