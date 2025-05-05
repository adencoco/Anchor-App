import { useSelectedPage } from '@/context/SelectedPageContext';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PageContentDisplay: React.FC = () => {
  const { selectedPageContent } = useSelectedPage();

  useEffect(() => {
    console.log('SelectedPageContent updated:', selectedPageContent);
  }, [selectedPageContent]);

  return (
    <View style={styles.container}>
      {selectedPageContent.length > 0 ? (
        selectedPageContent.map((item, index) => (
          <Text key={index} style={styles.text}>
            {item}
          </Text>
        ))
      ) : (
        <Text style={styles.text}>No content available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default PageContentDisplay;
