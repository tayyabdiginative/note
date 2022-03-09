const express = require("express");
const dotEnv = require("dotenv");
const notes = require("./data/notes");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongooDb = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const path = require("path");
dotEnv.config();
mongooDb();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

///////deployment///////////////

__dirname = path.resolve();
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "frontend","build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is Running");
  });
}

///////////////////////

const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => console.log(`server is running at ${PORT}`));
