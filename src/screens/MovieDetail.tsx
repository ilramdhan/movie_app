import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MovieDetail({ navigation }: { navigation: any }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Detail</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('MainHome')} />
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
