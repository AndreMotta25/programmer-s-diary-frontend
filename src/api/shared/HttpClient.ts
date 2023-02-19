import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

declare module 'axios' {
    
    interface Axios {
        get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
        post<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    }
    
}
abstract class HttpClient {
    protected readonly instance: AxiosInstance; 
    protected token:string;

    public constructor(baseURL:string) 
    {
        this.instance = axios.create({
            baseURL
        });
        this.initializeResponseInterceptor();
    }

    private initializeResponseInterceptor() {
        this.instance.interceptors.response.use(this.handleResponse,this.handleError)
    }

    private initializeRequestInterceptor() {
        this.instance.interceptors.request.use(this.handleRequest,this.handleError )       
    }

    private handleRequest = (config: InternalAxiosRequestConfig) => {
        if(config && config.headers)
            config.headers.Authorization = 'Bearer '+ this.token
        return config;
    }

    // vai desestruturar e vai passar retornar um data e não um axios response
    private handleResponse({data}:AxiosResponse) {
        return data
    }

    private handleError(error:any) {
        return Promise.reject(error);
    }

    public setAuthorization(token:string){ 
        this.token = token;
        this.initializeRequestInterceptor();
    }

    public hasAuthorization():boolean {
        if(this.token) return true
        return false;
    }
}

export {HttpClient}