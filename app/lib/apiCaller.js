// import fetch from 'isomorphic-fetch';
// import Config from '../../server/config';

import { Platform } from 'react-native';

import config from '../config';

export const API_URL = config.BASE_URL;

export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',},
    method,
    body: JSON.stringify(body),
  })
  .then((response) => response.text())
  .then((text) => {
    if (Platform.OS === 'android') {
      text = text.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, ''); // If android , I've removed unwanted chars. 
    }
    return text;
  })
  .then(response => JSON.parse(response));
 
}
