import axios from 'axios';

export const getUserIdApi = (name) => {
    return axios.get(`https://www.instagram.com/${name}/?__a=1`);
};
