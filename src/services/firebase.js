// Firebase configuration - Loaded from CDN to avoid Vite issues
let db = null;
let app = null;

export const initializeFirebase = async () => {
  if (db) return { db, app };
  
  try {
    // Load Firebase from CDN
    if (typeof window !== 'undefined' && !window.firebase) {
      // Load Firebase SDK from CDN
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js';
      document.head.appendChild(script);
      
      const firestoreScript = document.createElement('script');
      firestoreScript.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js';
      document.head.appendChild(firestoreScript);
      
      // Wait for Firebase to load
      await new Promise((resolve) => {
        script.onload = () => {
          firestoreScript.onload = resolve;
        };
      });
    }
    
    const firebaseConfig = {
      apiKey: "AIzaSyB20OmcQemfIXm4712im9mqiBnpeVt8sJQ",
      authDomain: "chicken-project-2.firebaseapp.com",
      projectId: "chicken-project-2",
      storageBucket: "chicken-project-2.firebasestorage.app",
      messagingSenderId: "596273529964",
      appId: "1:596273529964:web:bd51e2646d5ed48afa4449",
      measurementId: "G-9YLPHR08DB"
    };
    
    app = window.firebase.initializeApp(firebaseConfig);
    db = window.firebase.firestore(app);
    
    console.log('✅ Firebase initialized successfully from CDN');
    return { db, app };
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    return { db: null, app: null };
  }
};

export const getDb = () => db;
export const getApp = () => app;
