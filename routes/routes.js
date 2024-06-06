import express from "express";
import { FirestoreConnection } from "../Connection/Firestore.js";
import upload from "../services/uploads.js";
import { sendMail } from "../Mail/mail.js";

const db = new FirestoreConnection();

const router = express.Router();

router.get("/users", (req,res) => {
  let users = db.getCollection("users");
  res.json(users);
});

router.get("/users/:id", (req,res) => {
  let id = req.params.id;
  let foundUser = db.getDocumentById("users", id);
  res.json(foundUser);
});

router.post("/users", upload.single('image'), (req, res) => {
  let user = req.body.user;
  console.log(JSON.stringify(req.file));
  const image = req.file.path;
  user.data.image = image;
  const result = db.addDocument("users", user);
  console.log(result);
  res.json(user);
});

router.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = req.body.user;
  const result = db.deleteDocumentById("users", id);
  console.log(result);
  result = db.addDocument("users", user);
  console.log(result);
  res.json(user);
});
  
router.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const result = db.deleteDocumentById("users", id);
    console.log(result);
    res.json({
        message: result
    });
});

router.get("/pets", (req,res) => {
    let pets = db.getCollection("pets");
    res.json(pets);
});

router.get("/pets/:id", (req,res) => {
    let id = req.params.id;
    let foundPet = db.getDocumentById("pets", id);
    res.json(foundPet);
});

router.post("/pets", upload.single('image'), (req, res) => {
    let pet = req.body.pet;
    console.log(JSON.stringify(req.file));
    const image = req.file.path;
    pet.data.img = image;
    const result = db.addDocument("pets", pet);
    console.log(result);
    res.json(pet);
});

router.put("/pets/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pet = req.body.pet;
    const result = db.deleteDocumentById("pets", id);
    console.log(result);
    result = db.addDocument("pets", pet);
    console.log(result);
    res.json(pet);
});
  
router.delete("/pets/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const result = db.deleteDocumentById("pets", id);
    console.log(result);
    res.json({
        message: result
    });
});

router.get("/dates", (req,res) => {
    let dates = db.getCollection("dates");
    res.json(dates);
});

router.get("/dates/:id", (req,res) => {
    let id = req.params.id;
    let foundDate = db.getDocumentById("dates", id);
    res.json(foundDate);
});

router.post("/dates", (req, res) => {
    const date = req.body.date;
    const result = db.addDocument("dates", date);
    console.log(result);
    res.json(date);
});

router.put("/dates/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const date = req.body.date;
    const result = db.deleteDocumentById("dates", id);
    console.log(result);
    result = db.addDocument("dates", date);
    console.log(result);
    res.json(date);
});
  
router.delete("/dates/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const result = db.deleteDocumentById("dates", id);
    console.log(result);
    res.json({
        message: result
    });
});

router.get("/devs", (req,res) => {
    let devs = db.getCollection("devs");
    res.json(devs);
});

router.get("/devs/:id", (req,res) => {
    let id = req.params.id;
    let foundDev = db.getDocumentById("devs", id);
    res.json(foundDev);
});

router.post("/devs", upload.single('image'), (req, res) => {
    let dev = req.body.dev;
    console.log(JSON.stringify(req.file));
    const image = req.file.path;
    dev.data.image = image;
    const result = db.addDocument("devs", dev);
    console.log(result);
    res.json(dev);
});

router.put("/devs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const dev = req.body.dev;
    const result = db.deleteDocumentById("devs", id);
    console.log(result);
    result = db.addDocument("devs", dev);
    console.log(result);
    res.json(dev);
});
  
router.delete("/devs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const result = db.deleteDocumentById("devs", id);
    console.log(result);
    res.json({
        message: result
    });
});

export default router;