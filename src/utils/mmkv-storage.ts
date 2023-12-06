import { MMKV } from 'react-native-mmkv';
import config from '~/constants/config';

const storage = new MMKV({
  id: config.APP_PACKAGE,
});

export default storage;
