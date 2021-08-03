import axios from 'axios';

export const client = (token = null) => {
    const headers = {
            'Authorization': token ? `${token}` : '',
            'Content-Type' : 'application/json',
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
        };

    let instance = axios.create ();

    instance.interceptors.request.use(
        async config => {
          config.headers = { 
            'Authorization': `${token}`,
            'Accept': 'application/json',
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
          return config;
        },
        error => {
          Promise.reject(error)
    });

    return instance;
};