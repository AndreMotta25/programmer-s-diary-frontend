import { AuthenticationApi } from "./AuthenticationApi";
import { CardApi } from "./CardsApi";
import {PasswordAPI} from "./PasswordApi";
import { UserAPI } from "./UserApi";

export const userAPI = UserAPI.getInstance();
export const userAuthenticate = AuthenticationApi.getInstance();
export const passwordAPI = PasswordAPI.getInstance();
export const cardAPI = CardApi.getInstance(); 