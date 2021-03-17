const express = require("express");
const app = express();
const path = __dirname + "/public/projects/circle-derivative";
const path2 = __dirname + "/public/projects/repulsive";

app.use(express.static("./public"));
app.use("/circle-derivative", express.static(path));
app.use("/repulsive", express.static(path2));

app.get("*", (req, res) => {
  console.log(req.originalUrl);
});

app.listen(3000, () => {
  console.log("Server listening");
});
