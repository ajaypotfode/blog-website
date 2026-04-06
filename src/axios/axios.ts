import axios, { AxiosError } from "axios";

const api = axios.create(
    // {timeout:8000}
)

const authApiEndpoints = [
    '/api/login',
    '/api/register'
]

// const isLogedIn = false;

api.interceptors.request.use(
    (config) => {
        if (!navigator.onLine) {
            return Promise.reject(new Error('Network Error'));
        }
        return config
    },
    (error) => Promise.reject({
        message: (error.response?.data as { message: string })?.message || error.message,
        status,
        data: error.response?.data,
    })
)

// api.interceptors.request.use(
//     (config) => config,
//     (err) => Promise.reject(err)
// )


api.interceptors.response.use(
    (respoonse) => respoonse,
    (error: AxiosError) => {
        const requestedUrl = error.config?.url ?? "";

        const isAuthEndpoint = authApiEndpoints.some((endPoint) =>
            requestedUrl.startsWith(endPoint)
        )

        if (error.response?.status === 401 && !isAuthEndpoint) {
            localStorage.removeItem('blogUser');
            window.location.replace('/login');
        }

        return Promise.reject({
            message: (error.response?.data as { message: string })?.message || error.message,
            status,
            data: error.response?.data,
        });
    }

)

export default api