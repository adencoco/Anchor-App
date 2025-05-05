import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface Page {
  name: string;
}

interface SidebarProps {
  pages: Page[];
}

const Sidebar: React.FC<SidebarProps> = ({ pages }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {pages.map((page, index) => (
          <Text key={index} style={styles.pageName}>
            {page.name}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250, // Adjust width as needed
    backgroundColor: '#f0f0f0', // Light gray background
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  pageName: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default Sidebar;