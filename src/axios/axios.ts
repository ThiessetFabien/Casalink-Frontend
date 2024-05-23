import axios from 'axios';

const axoiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export function addTokenJwtToAxiosInstance(token: string) {
  axoiosInstance.defaults.headers.common.Authorization = `Bearer  + ${token}`;
}

export function removeTokenJwtToAxiosInstance() {
  axoiosInstance.defaults.headers.common.Accept = '';
}

export default axoiosInstance;
