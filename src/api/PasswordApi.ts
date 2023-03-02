import { HttpClient } from "./shared/HttpClient";

interface ResetPassword {
    token:string;
    new_password:string;
}
class PasswordAPI extends HttpClient{
    static apiInstance: PasswordAPI;

    private constructor() {
        super('http://localhost:3333/password');
        
    }

    static getInstance() {
        if(PasswordAPI.apiInstance)
            return PasswordAPI.apiInstance;
        else 
            return new PasswordAPI();    
    }

    async forgetPassword(email:string){
        await this.instance.post('/forget-password', {email:email} )
    }
    async resetPassword({token, new_password}:ResetPassword){
        await this.instance.patch(`/reset-password/${token}`, {new_password} )
    }
}

export  {PasswordAPI};