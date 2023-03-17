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
    valid: () => Promise<boolean>;
    getUser:(token:string) => Promise<void>
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

const valid = async () => {
  const token = localStorage.getItem('token');
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
}

const UserProvider = ({children}:IProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);  

  const navigate = useNavigate();
  const {pathname} = useLocation();
  
  const sign = async ({identification, password}:IRequestUser) => {
    const credentias = await userAuthenticate.authenticateUser({identification,password});
    setTokenLocalStorage(credentias.token);
    await getUser(credentias.token);   
  } 

  const forceLogout = useCallback( () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');

  },[navigate]);

  const logout = async () => {
    try 
    {
      await userAuthenticate.logoutUser();
    }
    catch {
    }
    finally {
      forceLogout();
    }
    
  }

  const setTokenLocalStorage = (token:string) => localStorage.setItem('token', token);
  
  const getUser = async (token:string) =>  {
    setAuthorizations(token);
    setUser(await userAPI.getUser());
  }

  useEffect(() => {
    const validateOnChangePage = async () => {
      if(!await valid() && localStorage.getItem('token')){
        forceLogout();
      }   
    } 
    validateOnChangePage();
    
  },[pathname,navigate,forceLogout])

  useEffect(() => {
    const autoLogin = async () => {
      const tokenValid = await valid();
      const token = localStorage.getItem('token');
      if(tokenValid && token) {  
          await getUser(token);
          navigate('/');
      }  
      setLoading(false);
    }
    autoLogin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <UserContext.Provider value={{
        sign,
        logout,
        user,
        loading,
        valid,
        getUser
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

