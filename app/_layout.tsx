import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import Sidebar from '@/components/Sidebar';
import PageManager from '@/components/PageManager';
import { useState } from 'react';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.root}>
      <ThemeProvider value={DarkTheme}>
        <PageManager setPages={setPages} setLoading={setLoading}>
          {loading ? <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View> : (
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
        </PageManager>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
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
