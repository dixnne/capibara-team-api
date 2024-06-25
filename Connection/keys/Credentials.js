import admin from 'firebase-admin';
import fs from 'fs';
import { initializeApp } from "firebase/app";

const data = fs.readFileSync('./Connection/keys/capibara-team-firebase.json');
const key = JSON.parse(data);

admin.initializeApp({
    credential: admin.credential.cert(key)
});

export { admin };