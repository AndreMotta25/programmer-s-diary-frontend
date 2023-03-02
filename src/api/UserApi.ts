import { HttpClient } from "./shared/HttpClient";


interface IPostUser {
    username:string;
    email:string;
    password:string;
}
export interface IGetUserResponse {
    username:string;
    email:string;
    avatar:string;
    id:string
}
interface IPutProfileUser {
    username:string;
    email: string;
}

class UserAPI extends HttpClient 
{
    private static apiInstance: UserAPI;

    private constructor() {
        super('http://localhost:3333/user');
    }
    
    public static getInstance():UserAPI {
        if(!UserAPI.apiInstance)
           return new UserAPI();
        return UserAPI.apiInstance;   
    }

    async postUser({username,password,email}:IPostUser) {
        await this.instance.post('/', {
            username,
            email,
            password
        })
    }
    // vai ser usado no update.
    async getUser() {
        return await this.instance.get<IGetUserResponse>('/');     
    }
    async putProfileUser({username, email}:IPutProfileUser) {
        return await this.instance.put('/profile-update', {username,email})
    }
    async uploadPhoto(file:File) {
        await this.instance.patch('/avatar', {avatar:file}, {
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })
    }
}
export {UserAPI}

/*
    Um ponto positivo de ter uma classe especifica para fazer requisiçoes é 
    que só tem um lugar pra atualizar ou procurar erros.   
*/ 