const admin = require('firebase-admin');
//Estas son las credenciales o llaves de Firebase se necesita agregar en cada proyecto por seguridad de Git
const serviceAccount = require('./keys/capibara-team-firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin