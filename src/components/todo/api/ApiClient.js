
import axios from "axios";

const getBasicAuthHeader = (username, password) => {
    const authToken = btoa(`${username}:${password}`);
    return `Basic ${authToken}`;
}

const getJwtAuthHeader = (jwtToken) => `Bearer ${jwtToken}`;

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080/',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        }
    }
)

export const configureJwt = (token) =>
    apiClient.interceptors.request.use(config =>{
        config.headers.Authorization = getJwtAuthHeader(token);
        return config;
    }, error => Promise.reject(error)
    );

export const ejectInterceptor = (interceptorId) =>
    apiClient.interceptors.request.eject(interceptorId);

export const authenticate = (username,password) =>
    apiClient.post('authenticate',{
        'username' : username,
        'password' : password
    });