import axios from 'axios';
import {Platform} from 'react-native';
import APP_CONFIG from '~/constants/config';
import {console_log} from './helper';

export const URI = APP_CONFIG.API_URL + APP_CONFIG.API_SUFFIX;
const service = axios.create({
  baseURL: URI,
  timeout: APP_CONFIG.API_TIMEOUT,
});

// request interceptor
service.interceptors.request.use(
  (config: any) => {
    // config.headers.auth = <token> ; // Set token from state or localstorage
    // Add app version and version hash in headers
    config.headers.app_version = APP_CONFIG.VERSION;
    config.headers.app_version_hash = APP_CONFIG.VERSION_HASH;

    // Note: This is a workaround for axios cancel token is used cause
    // android's okhttp library doesn't respect timeout. Hence to replicate same
    // timeouts in both devices need custom timeout.

    // Add abort controller
    let axiosCall = axios.CancelToken.source();
    // Add timeout for android devices as okhttp doesn't work like android
    if (Platform.OS == 'android') {
      setTimeout(() => {
        axiosCall.cancel(
          `Timeout of request ${APP_CONFIG.API_TIMEOUT} exceeded.`,
        );
      }, APP_CONFIG.API_TIMEOUT);
    }
    config.cancelToken = axiosCall.token;

    if (__DEV__) {
      // Add timestamp
      config.startTime = Date.now();
    }
    return config;
  },
  (error: any) => {
    // do something with request error
    console_log('Axios Error:', error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: any) => {
    if (__DEV__) {
      const endTime = Date.now();
      console_log(
        'Request completed in: ',
        endTime - response.config.startTime,
        ' ms',
      );
      console;
    }
    return response;
  },
  async (error: any) => {
    // Handle error
    if (error.message && error.response == undefined) {
      error.response = {data: {message: error.message}};
    }
    console_log('Axios Error:', error.response); // for debug
    return Promise.reject(error);
  },
);

export default service;
