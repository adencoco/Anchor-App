import { initializeApp } from 'firebase/app';
    import { getAuth } from 'firebase/auth';
    import { getFirestore } from 'firebase/firestore';
    import { getStorage } from 'firebase/storage';

    const firebaseConfig = {
        apiKey: "AIzaSyCQlrg4G4FxOy5GGwJ5_KpV7m_-xd5X0rs",
        authDomain: "anchor-application.firebaseapp.com",
        projectId: "anchor-application",
        storageBucket: "anchor-application.firebasestorage.app",
        messagingSenderId: "411696580239",
        appId: "1:411696580239:web:0b00c5080124c44cd312fa"
      };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Get service instances
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storageRef = getStorage(app);

    export { app, auth, db, storageRef };
