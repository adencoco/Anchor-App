import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet } from 'react-native';
import 'react-native-reanimated';

import Sidebar from '@/components/Sidebar';
import { SelectedPageProvider, useSelectedPage } from '@/context/SelectedPageContext';
import { db } from '@/firebaseConfig';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedPageContent } = useSelectedPage();

  const handlePagePress = async (pageName: string) => {
    try {
      const pagesCollectionRef = collection(db, 'pages');
      const q = query(pagesCollectionRef, where('name', '==', pageName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const pageSnapshot = await getDoc(docRef);

        if (pageSnapshot.exists()) {
          const content = pageSnapshot.data().content || [];
          setSelectedPageContent(content); // Update the context
          console.log("Page content fetched successfully:", content);
        } else {
          console.log('Document does not exist!');
        }
      } else {
        console.log('No document found with the specified name!');
      }
    } catch (error) {
      console.error('Error fetching page content:', error);
    }
  };

  useEffect(() => {
    const fetchPages = async () => {
      // Fetch pages logic remains unchanged
    };

    fetchPages();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SelectedPageProvider>
      <View style={styles.container}>
        <ThemeProvider value={DarkTheme}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <>
              <Sidebar pages={pages} handlePagePress={handlePagePress} />
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
    </SelectedPageProvider>
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
