import axios from 'axios';

const request = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    key: 'AIzaSyCOvY0Nj-EsXhLBBwnR85KiJjOkcQRZnvo',
  },
});

export default request;