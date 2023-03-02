import React, { createContext, useCallback, useEffect, useState} from 'react'
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { userAPI, userAuthenticate } from '../../api';


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




const UserProvider = ({children}:IProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);  
  // const [tokenStatus, setTokenStatus]  = useState(false);

  const navigate = useNavigate();
  const {pathname} = useLocation();
  

  const sign = async ({identification, password}:IRequestUser) => {
        const credentias = await userAuthenticate.authenticateUser({identification,password});
        setTokenLocalStorage(credentias.token);
        setUser(credentias.user);
        setToken(credentias.token);
        // setTokenStatus(true);
  } 

  const setAuthorizations = async () => {
    // const tokenValid = await token;
    if(token){
        userAPI.setAuthorization(token);
        userAuthenticate.setAuthorization(token);
    }
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
      // setTokenStatus(false);
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
    const validateToken = async () => {
      if(token){
        if(!await valid()){
          setToken(null);
          // setTokenStatus(false);
          localStorage.removeItem('token');
          navigate('/login')
        }  
      }           
    } 
    validateToken();
    
  },[pathname])
  
  useEffect(() => {
    setAuthorizations();   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  useEffect(() => {
    const reloadPage = async () => {
      const tokenValid = await valid()
      if(tokenValid && token && userAPI.hasAuthorization()) {
          setUser(await userAPI.getUser())
          if(pathname === '/login')
            redirect('/')
      }  
      setLoading(false);
    }
    
    reloadPage()
  },[pathname])
  
  console.log(user);
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

