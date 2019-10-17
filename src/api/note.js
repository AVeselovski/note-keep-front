import axios from 'axios';
import { API_URL } from '../utils/constants';

export const apiFetchNote = id => {
    return axios
        .get(`${API_URL}/notes/${id}`, {
            headers: { authorization: localStorage.getItem('token') },
        })
        .then(res => {
            return res;
        });
};

export const apiPostNote = note => {
    return axios
        .post(`${API_URL}/note`, note, {
            headers: { authorization: localStorage.getItem('token') },
        })
        .then(res => {
            return res;
        });
};

export const apiPutNote = (id, note) => {
    return axios
        .put(`${API_URL}/note/${id}`, note, {
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

export const apiDeleteNote = id => {
    return axios
        .delete(`${API_URL}/note/${id}`, {
            headers: { authorization: localStorage.getItem('token') },
        })
        .then(res => {
            return res;
        });
};
