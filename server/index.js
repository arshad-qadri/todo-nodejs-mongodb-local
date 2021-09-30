const express = require("express");
const cors = require("cors");

const app = express();

var corsOption = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOption));

app.use(express.json());

const db = require("./models");
db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to the database");
  })
  .catch(err => {
    console.log("not connected", err);
    process.exit();
  });

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "welcome arshad." });
});

require("./routes/routes")(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
