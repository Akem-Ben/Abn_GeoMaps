import axios, { AxiosResponse, AxiosError } from "axios";
import config from "./backendLink";

const { apiHost } = config().secrets;

const customAxios = axios.create({
    baseURL: `${apiHost}`,
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json'
    }
    // timeout: 30000,
});

const responseHandler = (response: AxiosResponse): AxiosResponse => {
    if (response?.status === 403) {
        localStorage.clear();
        window.location.href = "/";
    }
    return response;
};

const errorHandler = (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 403) {
        localStorage.clear();
        window.location.href = "/";
    }
    return Promise.reject(error);
};

customAxios.interceptors.response.use(
    (response: AxiosResponse) => responseHandler(response),
    (error: AxiosError) => errorHandler(error)
);

export default customAxios;