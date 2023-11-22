/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://localhost:8081/api',
});

Api.interceptors.request.use(
  (config: any) => {
    config.headers.authorization! = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqZWFuIiwiaWF0IjoxNzAwNTIzMTk5LCJleHAiOjE3MDA2MDk1OTl9.xNrT51nypUBBC3VVoN6Gwo1a4e0OozRZHr1_8hwtbbg84im088thYXffl1QMt-dv742fp2xN7WClBetqId8Jjg`;

    return config;
  },
  (error) => Promise.reject(error),
);
