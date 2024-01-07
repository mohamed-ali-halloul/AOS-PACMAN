const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");




app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());    
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
require("./app/routes/users_routes")(app);


app.listen(8080, () => {
  console.log("server is running on port 8080");
  console.log(process.env.API_URL);
});