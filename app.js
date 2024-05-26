import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));



app.get("/users", (req,res) => {
  let users = [{}];
  res.json(users);
});

app.get("/users/:id", (req,res) => {
  let id = req.params.id;
  let foundUser = {}
  res.json(foundUser);
});

app.post("/users", (req, res) => {
  const user = req.body.user;
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = req.body.user;
  res.json(user);
});
  
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
});

app.get("/pets", (req,res) => {
  let pets = [{}];
  res.json(pets);
});

app.get("/pets/:id", (req,res) => {
    const id = parseInt(req.params.id);
    let foundPet = {}
    res.json(foundPet);
});

app.post("/pets", (req, res) => {
    const pet = req.body.pet;
    res.json(pet);
});

app.put("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pet = req.body.pet;
  res.json(pet);
});
  
app.delete("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
});

app.get("/dates", (req,res) => {
  let dates = [{}];
  res.json(dates);
});

app.get("/dates/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const foundDate = {};
    res.json(foundDate);
});

app.post("/dates", (req, res) => {
    const date = req.body.date;
    res.json(date);
});

app.put("/dates/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const date = req.body.date;
    res.json(date);
});
  
app.delete("/dates/:id", (req, res) => {
    const id = parseInt(req.params.id);
});

app.get("/devs", (req,res) => {
  let devs = [{}];
  res.json(devs);
});

app.get("/devs/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const foundDev = {};
    res.json(foundDev);
});

app.post("/devs", (req, res) => {
    const dev = req.body.dev;
    res.json(dev);
});

app.put("/devs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const dev = req.body.dev;
    res.json(dev);
});
  
app.delete("/devs/:id", (req, res) => {
    const id = parseInt(req.params.id);
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
