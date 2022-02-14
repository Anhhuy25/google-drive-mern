require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

const route = require("./src/routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Use DB
const db = require("./src/config/db");
db.connect();

app.listen(port, () => console.log(`Server is listening on port ${port}`));

// Use Route
route(app);

// Link lấy token khi hết hạn: (1 tuần)
// https://console.cloud.google.com/apis/credentials/oauthclient/131805264054-mtf8o5v5dalrirats7nqag1bdjbf65ar.apps.googleusercontent.com?project=mern-project-320213&supportedpurview=project
// https://developers.google.com/oauthplayground
