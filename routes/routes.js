import express from "express";
import { FirestoreConnection } from "../Connection/Firestore.js";
import upload from "../services/uploads.js";

const db = new FirestoreConnection();

const router = express.Router();

router.get("/users", async (req, res) => {
  let users = await db.getCollection("users");
  res.json(users);
});

router.get("/users/:id", async (req, res) => {
  let id = req.params.id;
  let foundUser = await db.getDocumentById("users", id);
  res.json(foundUser);
});

router.post("/users", upload.single('file'), async (req, res) => {
  let user = req.body.user;
  console.log(JSON.stringify(req.file));
  const image = req.file.path;
  user.image = image;
  const result = await db.addDocument("users", user);
  console.log(result);
  res.json(user);
});

router.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = req.body.user;
  const result = await db.deleteDocumentById("users", id);
  console.log(result);
  result = await db.addDocument("users", user);
  console.log(result);
  res.json(user);
});
  
router.delete("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await db.deleteDocumentById("users", id);
    console.log(result);
    res.json({
        message: result
    });
});

router.get("/pets", async (req, res) => {
    let pets = await db.getCollection("pets");
    res.json(pets);
});

router.get("/pets/:id", async (req, res) => {
    let id = req.params.id;
    let foundPet = await db.getDocumentById("pets", id);
    res.json(foundPet);
});

router.post("/pets", upload.single('file'), async (req, res) => {
    let pet = JSON.parse(req.body.pet);
    console.log(JSON.stringify(req.file));
    const image = req.file.path;
    pet.img = image;
    const result = await db.addDocument("pets", pet);
    console.log(result);
    res.json(pet);
});

router.put("/pets/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const pet = req.body.pet;
    const result = await db.deleteDocumentById("pets", id);
    console.log(result);
    result = await db.addDocument("pets", pet);
    console.log(result);
    res.json(pet);
});
  
router.delete("/pets/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await db.deleteDocumentById("pets", id);
    console.log(result);
    res.json({
        message: result
    });
});

router.get("/dates", async (req, res) => {
    let dates = await db.getCollection("dates");
    res.json(dates);
});

router.get("/dates/:id", async (req, res) => {
    let id = req.params.id;
    let foundDate = await db.getDocumentById("dates", id);
    res.json(foundDate);
});

router.post("/dates", async (req, res) => {
    const date = req.body.date;
    const result = await db.addDocument("dates", date);
    console.log(result);
    res.json(date);
});

router.put("/dates/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const date = req.body.date;
    const result = await db.deleteDocumentById("dates", id);
    console.log(result);
    result = await db.addDocument("dates", date);
    console.log(result);
    res.json(date);
});
  
router.delete("/dates/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await db.deleteDocumentById("dates", id);
    console.log(result);
    res.json({
        message: result
    });
});

router.get("/devs", async (req, res) => {
    let devs = await db.getCollection("devs");
    res.json(devs);
});

router.get("/devs/:id", async (req, res) => {
    let id = req.params.id;
    let foundDev = await db.getDocumentById("devs", id);
    res.json(foundDev);
});

router.post("/devs", upload.single('file'), async (req, res) => {
    let dev = req.body.dev;
    console.log(JSON.stringify(req.file));
    const image = req.file.path;
    dev.image = image;
    const result = await db.addDocument("devs", dev);
    console.log(result);
    res.json(dev);
});

router.put("/devs/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const dev = req.body.dev;
    const result = await db.deleteDocumentById("devs", id);
    console.log(result);
    result = await db.addDocument("devs", dev);
    console.log(result);
    res.json(dev);
});
  
router.delete("/devs/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await db.deleteDocumentById("devs", id);
    console.log(result);
    res.json({
        message: result
    });
});
export default router;