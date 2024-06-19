import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import type { MovieListProps, Movie } from '../../types/app';
import { EXPO_PUBLIC_API_ACCESS_TOKEN } from '@env';
import MovieItem from './MovieItem';

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
};

const MovieList = ({ title, path, coverType }: MovieListProps): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = (): void => {
    const url = `https://api.themoviedb.org/3/${path}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${EXPO_PUBLIC_API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return await response.json();
      })
      .then((response) => {
        setMovies(response.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        style={styles.movieList}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={movies}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={coverImageSize[coverType]}
            coverType={coverType}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  purpleLabel: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8978A4',
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieList: {
    paddingLeft: 4,
  },
});

export default MovieList;
