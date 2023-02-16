// Functional react component blueprint
import {View, Text} from 'react-native';

const MovieDetails = () => {
  return (
    <View>
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
