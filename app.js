import express from "express";
import bodyParser from "body-parser";

import { FirestoreConnection } from "./Connection/Firestore.js";

const db = new FirestoreConnection();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let users = [{

}];

app.get("/users", (req,res) => {
  res.json(users);
});

app.get("/users/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const foundUser = users.find(user => user.id === id);
    if (foundUser ==! undefined) {
        res.json(foundUser);
    } else {
        res.json({
            error: "User not found"
        });
    }
});

app.post("/users", (req, res) => {
    const user = req.body.user;
    const id = users[users.length - 1].id + 1;
    user.id = id;
    users.push(user);
    res.json(users[users.length -1]);
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = req.body.user;
    const searchIndex = users.findIndex(user => user.id === id);
    users[searchIndex] = user;
    res.json(users[searchIndex]);
});

app.patch("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existingUser = users.find(user => user.id === id);
    const searchIndex = users.findIndex(user => user.id === id);
    users[searchIndex] = {
      id: id,
      username: req.body.username || existingUser.username,
      name: {
        firstname: req.body.firstname || existingUser.firstname,
        lastname: req.body.lastname || existingUser.lastname,
      }
    };
    res.json(jokes[searchIndex]);
});
  
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = users.findIndex(user => user.id === id);
    if (searchIndex > -1) {
      users.splice(searchIndex, 1);
      res.sendStatus(200);
    } else {
      res.status(404).json({error: "User with id " + id + " not found. No users were deleted."});
    }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
