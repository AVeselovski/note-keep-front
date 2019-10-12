import axios from 'axios';
import { API_URL } from '../utils/constants';

export const apiSaveNote = note => {
    return axios
        .post(`${API_URL}/note`, note, {
            headers: { authorization: localStorage.getItem('token') },
        })
        .then(res => {
            return res;
        });
};

export const apiChangeStatus = (id, status) => {
    return axios
        .put(
            `${API_URL}/note/status/${id}`,
            {
                status,
            },
            {
                headers: { authorization: localStorage.getItem('token') },
            }
        )
        .then(res => {
            return res;
        });
};
