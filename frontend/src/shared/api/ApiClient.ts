// API 클라이언트 설정 예시
import axios from 'axios';

const ApiClient = axios.create({
  baseURL: 'https://api.example.com',
});

export default ApiClient;
