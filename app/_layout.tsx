
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator } from 'react-native';
import 'react-native-reanimated';
//import { db } from '../firebaseConfig.js'; // Import db from your config file
import { collection, getDocs } from 'firebase/firestore'; // Import necessary Firestore functions

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

//export { app, auth, db, storageRef };


import { useEffect, useState } from 'react';

import { View } from 'react-native';
import Sidebar from '@/components/Sidebar';

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pagesCollectionRef = collection(db, 'pages'); // Get the collection reference
        const pagesSnapshot = await getDocs(pagesCollectionRef); // Get documents
        const pagesData = pagesSnapshot.docs.map(doc => ({
          name: doc.data().name,
        }));
        setPages(pagesData);
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ThemeProvider value={DarkTheme}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            <Sidebar pages={pages} />
            <View style={styles.content}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </View>
          </>
        )}
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
