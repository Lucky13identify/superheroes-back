const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 80;

const superherosRouter = require("./routes/api/superheros");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/superheroes", superherosRouter);

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT} port`);
});
