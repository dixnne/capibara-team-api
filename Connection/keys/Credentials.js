import admin from 'firebase-admin';
import serviceAccount from './capibara-team-firebase.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export { admin };