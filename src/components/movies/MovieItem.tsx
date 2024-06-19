import React from 'react';
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { MovieItemProps } from '../../types/app';
import { useNavigation, StackActions } from '@react-navigation/native'

const MovieItem = ({ movie, size, coverType }: MovieItemProps): JSX.Element => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${
    coverType === 'backdrop' ? movie.backdrop_path : movie.poster_path
  }`;

  const navigation = useNavigation()
  const pushAction = StackActions.push('MovieDetail', { id: movie.id })

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(pushAction)
      }}
    >
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={[styles.image, size]}
        imageStyle={styles.imageStyle}
        source={{ uri: imageUrl }}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
          style={styles.gradient}
        >
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
  },
  image: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: 8,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    padding: 8,
    justifyContent: 'flex-end',
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: 'yellow',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default MovieItem;
