// Functional react component blueprint
import {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {console_log} from '~/utils/helper';
import axios from '~/utils/axios';

// Importing components
import LoadingScreen from '~/components/LoadingScreen';
import {DEVICE_HEIGHT} from '~/constants/device';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console_log('Fetching movie details');
    setLoading(true);

    fetchMovieDetails().then(movie => {
      setMovie(movie);
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
        style={{width: 200, height: 300}}
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
