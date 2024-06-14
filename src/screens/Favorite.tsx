import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Favorite(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
