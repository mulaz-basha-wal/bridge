import axios from 'axios';

const setupAxios = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL
    });

    instance.interceptors.request.use(config => {
        const customConfig = config;
        customConfig.baseURL = process.env.REACT_APP_BASE_URL;
        customConfig.headers = {
            'Content-Type': 'application/json'
        };
        return customConfig;
    });

    instance.interceptors.response.use(
        response => {
            response.responseTime = new Date().getTime() - response.config.requestStartedAt;
            return response;
        },
        error => {
            let message = error?.response?.data?.reason || error?.response?.data?.reason;
            if (!message) message = 'Temporarily services are unavailable, please try after sometime.';    
            const err = new Error(message);
            throw err;
        }
    );

    return instance;
};

export default setupAxios;
