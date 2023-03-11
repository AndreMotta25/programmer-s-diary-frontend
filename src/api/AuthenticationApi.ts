import { HttpClient } from "./shared/HttpClient";

interface IAuthenticate {
    identification:string;
    password:string;
}
export interface IAuthenticateResponse {
    user: {
        email:string;
        id:string;
        avatar:string;
    }
    token:string;
}

class AuthenticationApi extends HttpClient{
    private static apiInstance: AuthenticationApi;

    private constructor() {
        super('https://programmer-s-diary-node-production.up.railway.app/sessions')
    }
    
    public static getInstance():AuthenticationApi {
        if(!AuthenticationApi.apiInstance)
           return new AuthenticationApi();
        return AuthenticationApi.apiInstance;   
    }
    async authenticateUser({identification,password}:IAuthenticate) {
        return await this.instance.post<IAuthenticateResponse>('/', {identification,password});
    }

    async logoutUser(){
        await this.instance.patch('/logout')
    }
    async validateToken(token:string) {
        return (await this.instance.post<{message:string}>(`/validate-token/${token}`)).message;
    }
}
export {AuthenticationApi}