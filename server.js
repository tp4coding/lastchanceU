const express = require("express");
const bodyParser = require("body-parser");
const apiRoute = require("./route/apiRoute");
const uiRoute = require("./route/uiRoute");
const router = express.Router();

const app = express();
const PORT = process.env.PORT;

if (!PORT) {
  console.error("Environment variable PORT is not set");
  process.exit(1);
}

// Middleware
app.use(bodyParser.json());
app.use(express.static("resources"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/resources/view/register.html");
});


// Routes
app.use("/api", apiRoute);
app.use("/UI", uiRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
