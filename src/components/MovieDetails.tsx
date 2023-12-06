// Functional react component blueprint
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { console_log } from '~/utils/helper';
import axios from '~/utils/axios';

// Importing components
import STORAGE from '~/utils/mmkv-storage';
import LoadingScreen from '~/components/LoadingScreen';
import { DEVICE_HEIGHT } from '~/constants/device';
import MMKV_KEYS from '~/constants/mmkv-keys';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console_log('Fetching movie details');
    setLoading(true);

    const old_movie = STORAGE.getString(MMKV_KEYS.MOVIE);
    console_log('Old movie: ', old_movie);

    fetchMovieDetails().then(movie => {
      setMovie(movie);
      STORAGE.set(MMKV_KEYS.MOVIE, movie.title);
    });
    // Fetch movie details
    setLoading(false);
  }, []);

  // API function to fetch movie details
  const fetchMovieDetails = async () => {
    const response = await axios.get('/');
    console_log('Response: ', response.data);
    // Fetch movie details
    return {
      ...response.data,
    };
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{movie.title}</Text>
      <Image
        style={{ width: 200, height: 300 }}
        source={{
          uri: movie.poster_url,
        }}
      />
      <Text style={styles.summaryText}>{movie.overview}</Text>
    </View>
  );
};

// Need to create a variable and then export it. Instead of doing something like:
// export default () => {
//   return (
//     ...
//   );
// }
// Cause it won't register the component name in the ide

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  titleText: {
    fontSize: 20,
  },
  summaryText: {
    fontSize: 12,
    padding: 10,
  },
});
