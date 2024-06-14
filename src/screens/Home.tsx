import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }: { navigation: any }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title="Move to Movie Detail" onPress={() => navigation.navigate('MovieDetail')} />
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
    marginBottom: 16,
  },
});
