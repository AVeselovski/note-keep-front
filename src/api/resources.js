import axios from 'axios';
import { API_URL } from '../utils/constants';

export const apiGetCards = () => {
	return axios
		.get(`${API_URL}/notes`, {
			headers: { authorization: localStorage.getItem('token') }
		})
		.then(res => {
			return res;
		});
};
