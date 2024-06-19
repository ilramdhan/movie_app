import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import type { MovieListProps } from '../types/app'
import MovieList from '../components/movies/MovieList' // Assuming you're using Expo for this gradient

interface MovieDetailProps {
  route: {
    params: {
      id: number;
    };
  };
}

interface MovieDetailData {
  adult: boolean;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

const MovieDetail = ({ route }: MovieDetailProps): JSX.Element => {
  const { id } = route.params;
  const [movieDetail, setMovieDetail] = useState<MovieDetailData | null>(null);
  const [overviewExpanded, setOverviewExpanded] = useState(false);
  useTheme();

  const movieLists: MovieListProps[] = [
    {
      title: 'Recomendation',
      path: `movie/${id}/recommendations?language=en-US`,
      coverType: 'poster',
    },
  ];

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjc2Zjk5ZDUzMGFlMTU5YTY1MTI3ZGNjOWIxZThlMCIsInN1YiI6IjY2NmQxNzYxYzQxZjhlOTBlMzMxOWUxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pUXFNJSByu66jU1qHHDYXbqaxSXSoHdB11QtMSYAvOI',
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMovieDetail(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);


  const toggleOverview = () => {
    setOverviewExpanded(!overviewExpanded);
  };

  if (!movieDetail) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const backdropImageUrl = `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {movieDetail.backdrop_path ? (
        <ImageBackground
          source={{ uri: backdropImageUrl }}
          style={styles.backdrop}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0, 5]}
            style={styles.gradient}
          >
            <Text style={styles.title}>{movieDetail.title}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="yellow" />
              <Text style={styles.rating}>
                {movieDetail.vote_average.toFixed(1)}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      ) : (
        <View style={styles.noImageContainer}>
          <Text>No Image Available</Text>
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>
          {overviewExpanded ? movieDetail.overview : `${movieDetail.overview.slice(0, 200)}...`}
        </Text>
        {movieDetail.overview.length > 200 && (
          <TouchableOpacity onPress={toggleOverview}>
            <Text style={styles.readMoreLink}>{overviewExpanded ? 'Read Less' : 'Read More'}</Text>
          </TouchableOpacity>
        )}

        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Original Language</Text>
              <Text style={styles.infoText}>{movieDetail.original_language}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Popularity</Text>
              <Text style={styles.infoText}>{movieDetail.popularity.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.infoColumn}>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Release Date</Text>
              <Text style={styles.infoText}>{movieDetail.release_date}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Vote Count</Text>
              <Text style={styles.infoText}>{movieDetail.vote_count}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Genres</Text>
        <View style={styles.genresContainer}>
          {movieDetail.genres.map((genre) => (
            <Text key={genre.id} style={styles.genre}>
              {genre.name}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Production Companies</Text>
        <View style={styles.productionContainer}>
          {movieDetail.production_companies.map((company) => (
            <View key={company.id} style={styles.companyContainer}>
              {company.logo_path ? (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w200${company.logo_path}` }}
                  style={styles.companyLogo}
                  resizeMode="contain"
                />
              ) : null}
            </View>
          ))}
        </View>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.containerrec}>
          {movieLists.map((movieList) => (
            <MovieList
              title={movieList.title}
              path={movieList.path}
              coverType={movieList.coverType}
              key={movieList.title}
            />
          ))}
        </ScrollView>
      </SafeAreaView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerrec: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  backdrop: {
    width: '100%',
    height: 300,
    marginBottom: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 16,
    color: '#FFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 16,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 22,
    textAlign: 'justify',
    color: '#333',
  },
  readMoreLink: {
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginBottom: 1,
    // justifyContent: 'center',
  },
  genre: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#EEE',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  productionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  companyContainer: {
    marginRight: 16,
  },
  companyLogo: {
    width: 60,
    height: 60,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  infoItem: {
    marginBottom: 0,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
  },

  noImageContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    marginBottom: 16,
  },
});

export default MovieDetail;

