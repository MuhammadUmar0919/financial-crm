import axios from "axios";
import { useEffect } from "react";

const tokenSession = JSON.parse(sessionStorage.getItem("admin"));
const tokenLocal = JSON.parse(localStorage.getItem("admin"));
const instance = axios.create({
    baseURL: "url",
    headers: {
        "Content-Type": "application/json",
        // "Accept-Language": "en",
        timeout: 2000,
        // Authorization: `Bearer ${tokenSession || tokenLocal}`,
    },
});

const AxiosInterceptor = ({ children }) => {
    useEffect(() => {
        const reqInterceptor = (req) => {
            req.headers.Authorization = `Bearer ${tokenSession || tokenLocal}`;
            return req;
        };
        const reqErrInterceptor = (error) => {
            console.error("reqErrInterceptor", error);
            return Promise.reject(error);
        };
        const resInterceptor = (response) => {
            response.headers.Authorization = `Bearer ${
                tokenSession || tokenLocal
            }`;
            return response;
        };
        const resErrInterceptor = (error) => {
            console.error("resErrInterceptor", error);
            if (error?.response?.status === 401) {
                if (sessionStorage.getItem("admin"))
                    sessionStorage.removeItem("admin", tokenSession);
                if (localStorage.getItem("admin")) {
                    localStorage.removeItem("admin", tokenLocal);
                }
                window.location.href = "/login";
            }
            return Promise.reject(error);
        };
        const reqinterceptor = instance.interceptors.request.use(
            reqInterceptor,
            reqErrInterceptor
        );
        const resinterceptor = instance.interceptors.response.use(
            resInterceptor,
            resErrInterceptor
        );
        return (
            () => instance.interceptors.request.eject(reqinterceptor),
            () => instance.interceptors.response.eject(resinterceptor)
        );
    }, []);
    return children;
};

export default instance;
export { AxiosInterceptor };
