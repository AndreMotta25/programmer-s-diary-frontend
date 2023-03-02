import { AuthenticationApi } from "./AuthenticationApi";
import {PasswordAPI} from "./PasswordApi";
import { UserAPI } from "./UserApi";

export const userAPI = UserAPI.getInstance();
export const userAuthenticate = AuthenticationApi.getInstance();
export const passwordAPI = PasswordAPI.getInstance();