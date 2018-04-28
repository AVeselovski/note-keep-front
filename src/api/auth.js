import axios from 'axios';
import { API_URL } from '../utils/constants';


export const apiLogin = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials)
        .then(res => {
            return res;
        });
};

export const apiRegister = (credentials) => {
    return axios.post(`${API_URL}/register`, credentials)
        .then(res => {
            return res;
        });
}
