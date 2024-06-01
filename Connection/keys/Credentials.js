import admin from 'firebase-admin';
import serviceAccount from './capibara-team-firebaseTest.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export { admin };