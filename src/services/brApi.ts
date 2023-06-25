/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import axios from 'axios';

export const BrApi = axios.create({
  baseURL: 'https://brapi.dev/api',
});
