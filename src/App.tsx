import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import MovieDetails from '~/components/MovieDetails';

const App = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <MovieDetails />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#FFF',
    flex: 1,
  },
});
