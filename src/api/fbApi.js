import axios from 'axios';

const appId = '700637940423400';
const appSecret = 'bda5db70b25acc3cf0a503bd8934e590';

export const getFBidApi = () => {
    const url = 'https://www.facebook.com:443/piyush.michael';
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
            resolve(id);
        })
        .catch(e => {
            reject(e)
        });
    });
}
