import React, { createContext, useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [token, setToken] = useState<Promise<string | null>>(async () => {
    const token = localStorage.getItem('token');
    try{
      if(token)
        await userAuthenticate.validateToken(token);
      return token;
    }
    catch{
      localStorage.removeItem('token')
      return null
    }
    
  });
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const sign = async ({identification, password}:IRequestUser) => {
        const credentias = await userAuthenticate.authenticateUser({identification,password});

        setTokenLocalStorage(credentias.token);
        setUser(credentias.user);
        setToken(new Promise(resolve => {resolve(credentias.token)}))
  } 

  const setAuthorizations = async () => {
    const tokenValid = await token;
    if(tokenValid){
        userAPI.setAuthorization(tokenValid);
        userAuthenticate.setAuthorization(tokenValid);
    }
  }

  const logout = async () => {
    await userAuthenticate.logoutUser();
    localStorage.removeItem('token');
    navigate('/login');
  }

  const setTokenLocalStorage = (token:string) => localStorage.setItem('token', token);

  useEffect(() => {
    setAuthorizations();   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  useEffect(() => {
    const reloadPage = async () => {
      const tokenValid = await token

      if(tokenValid && userAPI.hasAuthorization()) {
          setUser(await userAPI.getUser())
          if(pathname === '/login')
            navigate('/')
      }       
    }
    
    reloadPage()
  },[pathname])
  
  return (
    <UserContext.Provider value={{
        sign,
        logout,
        user,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
