
// src/lib/firebase-admin.ts
import admin from 'firebase-admin';

// Check for necessary environment variables and provide helpful messages
if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    console.warn('⚠️  FIREBASE_PROJECT_ID is not set in your .env file. Admin features will be disabled.');
}
if (!process.env.FIREBASE_CLIENT_EMAIL) {
    console.warn('⚠️  FIREBASE_CLIENT_EMAIL is not set in your .env file. Admin features will be disabled.');
}
if (!process.env.FIREBASE_PRIVATE_KEY) {
    console.warn('⚠️  FIREBASE_PRIVATE_KEY is not set in your .env file. Admin features will be disabled.');
}


const serviceAccount: admin.ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

let adminApp: admin.app.App;

function initializeAdminApp() {
    if (admin.apps.length > 0) {
        return admin.apps[0]!;
    }
    
    // Check if we have the required credentials
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 
        !process.env.FIREBASE_CLIENT_EMAIL || 
        !process.env.FIREBASE_PRIVATE_KEY) {
        console.warn('⚠️  Firebase Admin SDK not initialized due to missing credentials. Admin features will be disabled.');
        return null;
    }
    
    try {
        adminApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
        return adminApp;
    } catch (error: any) {
        console.error('Firebase Admin SDK initialization error.', error.message);
        console.warn('⚠️  Admin features will be disabled due to Firebase initialization failure.');
        return null;
    }
}


export function getAdminDb() {
    if (!adminApp) {
        const app = initializeAdminApp();
        if (!app) return null;
    }
    return admin.firestore();
}

export function getAdminAuth() {
    if (!adminApp) {
        const app = initializeAdminApp();
        if (!app) return null;
    }
    return admin.auth();
}

export function getAdminStorage() {
    if (!adminApp) {
        const app = initializeAdminApp();
        if (!app) return null;
    }
    return admin.storage();
}
