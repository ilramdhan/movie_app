import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_ACCESS_TOKEN } from '@env';

const MovieDetail = (): JSX.Element => {
  const fetchData = (): void => {
    if (!EXPO_PUBLIC_API_URL || !EXPO_PUBLIC_API_ACCESS_TOKEN) {
      throw new Error('ENV not found');
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${EXPO_PUBLIC_API_ACCESS_TOKEN}`,
      },
    };

    fetch(EXPO_PUBLIC_API_URL, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Detail Page</Text>
      <Button
        title="Fetch Data"
        onPress={() => {
          fetchData();
        }}
      />
    </View>
  );
};

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

export default MovieDetail;
