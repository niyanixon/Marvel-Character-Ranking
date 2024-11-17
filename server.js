const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 2000;
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let db,
  dbConnectionStr =
    "mongodb+srv://demo:demo@cluster0.k73rh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  dbName = "Marvel";

MongoClient.connect(dbConnectionStr).then((client) => {
  console.log(`Connected to ${dbName} Database`);
  db = client.db(dbName);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  db.collection("Characters")
    .find().sort({thumbUp: -1})
    .toArray()
    .then((data) => {
      res.render("index.ejs", { characters: data });
    })
    .catch((error) => console.error(error));
});
app.post("/characters", (req, res) => {
  db.collection("Characters")
    .insertOne({
      name: req.body.name,
      govName: req.body.govName,
      thumbUp: 0,
    })
    .then((result) => {
      console.log("Character Added");
      res.redirect("/");
    })
    .catch((error) => console.error(error));
});
app.put("/characters", (req, res) => {
  db.collection("Characters")
    .updateOne(
      { name: req.body.name, govName: req.body.govName },
      {
        $set: {
          thumbUp: req.body.thumbUp + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      res.json("Like Added");
    })
    .catch((error) => console.error(error));
});
app.put("/removeLike", (req, res) => {
  db.collection("Characters")
    .updateOne(
      {  name: req.body.name, govName: req.body.govName },
      {
        $set: {
          thumbUp: req.body.thumbUp - 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      res.json("Like Removed");
    })
    .catch((error) => console.error(error));
});
app.delete("/characters", (req, res) => {
  db.collection("Characters")
    .findOneAndDelete({
      name: req.body.name, govName: req.body.govName,
    })
    .then((result) => {
      console.log("Character Deleted");
      res.json("Character Deleted");
    })
    .catch((error) => console.error(error));
});
