import React, { createContext, useCallback, useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { cardAPI, userAPI, userAuthenticate } from '../../api';


interface IUser {
    email:string;
    id:string;
    avatar:string;
}

interface IUserContext {
    sign: (data:IRequestUser) => Promise<void>;
    logout: () => Promise<void>,
    user: IUser | null;
    loading: boolean,
    valid: () => Promise<boolean>
}

interface IRequestUser {
    identification:string;
    password:string;
}

interface IProps {
    children: JSX.Element
}

export const UserContext = createContext({} as IUserContext);


const setAuthorizations = (token:string) => {
  userAPI.setAuthorization(token);
  userAuthenticate.setAuthorization(token);
  cardAPI.setAuthorization(token);
}

const UserProvider = ({children}:IProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);  

  const navigate = useNavigate();
  const {pathname} = useLocation();
  
  const sign = async ({identification, password}:IRequestUser) => {
        const credentias = await userAuthenticate.authenticateUser({identification,password});
        setTokenLocalStorage(credentias.token);
        setUser(credentias.user);
        setToken(credentias.token);
        setAuthorizations(credentias.token);
  } 

  const logout = async () => {
    try 
    {
      await userAuthenticate.logoutUser();
    }
    catch {
    }
    finally {
      localStorage.removeItem('token');
      setToken(null);
      navigate('/login');
    }
    
  }

  const setTokenLocalStorage = (token:string) => localStorage.setItem('token', token);
  
  const valid = useCallback(async () => {
    if(token) {
      try{
        await userAuthenticate.validateToken(token);
        return true;
      }
      catch{
        return false;
      }        
    }  
    return false 
  },[token])

  useEffect(() => {
    const validateOnChangePage = async () => {
      if(!await valid()){
          setToken(null);
          localStorage.removeItem('token');
          navigate('/login')
      }             
    } 
    validateOnChangePage();
    
  },[pathname,valid,navigate])
  
  useEffect(() => {
    if(token)
      setAuthorizations(token);   
  },[token])

  useEffect(() => {
    const autoLogin = async () => {
      const tokenValid = await valid();
      if(tokenValid) {  
          setUser(await userAPI.getUser());
          navigate('/');
      }  
      setLoading(false);
    }
    
    autoLogin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[valid])
  
  return (
    <UserContext.Provider value={{
        sign,
        logout,
        user,
        loading,
        valid
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

