import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface PageContentDisplayProps {
  selectedPageContent?: string[];
}

const PageContentDisplay: React.FC<PageContentDisplayProps> = ({ selectedPageContent = [] }) => {
  return (
    <View style={styles.container}>
      {selectedPageContent.map((item, index) => (
        <Text key={index} style={styles.text}>
          {item}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  }
});

export default PageContentDisplay;
