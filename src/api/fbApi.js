import axios from 'axios';

export const getFBidApi = (profile) => {
    const url = `https://www.facebook.com:443/${profile}`;
    const axiosInstance = axios.create({
        headers: {
            'accept': 'text/html,application/json,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
            'Host': 'www.facebook.com',
            'Connection': 'Keep-Alive',
            'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6'
        }
    });
    return new Promise((resolve, reject) => {
        axiosInstance.get(url)
        .then(res => {
            const id = res.data.match(/"entity_id":"(\d*)"/);
            let substr = res.data.slice(0, id.index);
            substr = substr.slice(substr.lastIndexOf('https'));
            substr = substr.slice(0, substr.lastIndexOf(''));
            substr = substr.replace(/\\/g, '');
            resolve({ id: id[1], url: substr });
        })
        .catch(e => {
            reject(e)
        });
    });
}

export const profilePic = (id) => {
    const url = `https://graph.facebook.com/${id}/picture?type=large`;
    return axios.get(url);
}
