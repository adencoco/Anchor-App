import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { SelectedPageProvider } from '@/context/SelectedPageContext';
import PageManager from '@/components/PageManager';

export default function TabLayout() {
  const [pages, setPages] = useState<any[]>([]);

  return (
    <SelectedPageProvider>
      <PageManager pages={pages} setPages={setPages}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: 'absolute',
              },
              default: {},
            }),
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: 'Explore',
            }}
          />
        </Tabs>
      </PageManager>
    </SelectedPageProvider>

  );
}
