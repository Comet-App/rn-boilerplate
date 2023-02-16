import {View, Text, StyleSheet} from 'react-native';
import {DEVICE_HEIGHT} from '~/constants/device';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  loadingText: {
    margin: 'auto',
    fontSize: 50,
  },
});

export default LoadingScreen;
