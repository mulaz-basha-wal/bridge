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
            if (error?.message === 'Network Error') {
                return { data: { message: 'please try after sometime.' }, error: true }
            }
            return error.response
        }
    );

    return instance;
};

export default setupAxios;
