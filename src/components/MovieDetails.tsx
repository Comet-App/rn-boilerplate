// Functional react component blueprint
import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {console_log} from '~/utils/helper';
import axios from '~/utils/axios';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

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
    console_log(response.data);
    // Fetch movie details
    return {
      ...response.data,
    };
  };

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      <Text>Movie Details</Text>
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
