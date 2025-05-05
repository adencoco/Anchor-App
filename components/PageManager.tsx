import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useSelectedPage } from '@/context/SelectedPageContext';
import { db } from '@/firebaseConfig';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

interface PageManagerProps {
  setPages: React.Dispatch<React.SetStateAction<any[]>>;
  children: React.ReactNode;
}
const PageManager: React.FC<PageManagerProps> = ({ children, setPages }) => {

    const [loading, setLoading] = useState<boolean>(true);

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
          setSelectedPageContent(content);
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
    setLoading(true)
    const fetchPages = async () => {
        try {
            const pagesCollectionRef = collection(db, 'pages');
            const querySnapshot = await getDocs(pagesCollectionRef);
            const pagesData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPages(pagesData);
          } catch (error) {
            console.error('Error fetching pages:', error);
          } finally {
            setLoading(false)
          }
    };

    fetchPages();
  }, [setPages]);

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
      });
    
      if (!loaded) {
        return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>
      }
      if (loading) {
        return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>

      }



  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})
export default PageManager;