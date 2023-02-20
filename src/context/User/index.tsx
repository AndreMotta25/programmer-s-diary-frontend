import React, { createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { userAPI, userAuthenticate } from '../../api';


interface IUser {
    email:string;
    id:string;
    avatar:string;
}

interface IUserContext {
    sign: (data:IRequestUser) => Promise<void>
    user: IUser | null
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
  /*
        Depois mexer aqui para fazer um if e verificar se o token está valido para só assim atribui-lo aqui.
        Se o if ficar aqui, não vou precisar de usar em outros lugares da aplicação
  */ 
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const navigate = useNavigate(); 

  const sign = async ({identification, password}:IRequestUser) => {
        const credentias = await userAuthenticate.AuthenticateUser({identification,password});

        // userAPI.setAuthorization(credentias.token);
        setTokenLocalStorage(credentias.token);
        setUser(credentias.user);
        setToken(credentias.token)
  } 

  const setAuthorizations = () => {
    if(token){
        userAPI.setAuthorization(token);
        userAuthenticate.setAuthorization(token);
    }
  }

  console.log(userAPI)
  /*
    Tem que excluir o token do localStorage e acessar a api e levar para pagina de login
  */   
  const logout = async () => {
    // if(token){
        // userAuthenticate.setAuthorization(token);
    await userAuthenticate.LogoutUser();
    // }
    localStorage.removeItem('token');
  }

  const setTokenLocalStorage = (token:string) => localStorage.setItem('token', token);
  
  useEffect(() => {
    setAuthorizations();   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  useEffect(() => {
    if(token && userAPI.hasAuthorization()) {
        // userAPI.setAuthorization(token);
        userAPI.getUser().then(user => {
            setUser(user);
            navigate('/')
        })
    } 
  },[])

  

  return (
    <UserContext.Provider value={{
        sign,
        user
    }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider


/*
    todo: só atribuir o token se o mesmo estiver valido
*/ 