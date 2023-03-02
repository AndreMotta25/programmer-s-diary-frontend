import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useToastContext } from './useToast'; 

interface IError {
  msg:string;
  param:string;
  value:string;
}
interface IFormError {
  response:{
    data:{
      errors: IError[]
    }
  }
}
interface IAppError {
    response: {
      data:{
        msg: string;
      }
    } 
}

const isFormError = (value:unknown): value is IFormError => {
  if(value && value instanceof AxiosError && 'errors' in value.response?.data)
    return true;
  return false;  
}  
const isAppError = (value:unknown): value is IAppError => {
    if(value && value instanceof AxiosError && 'msg' in value.response?.data)
      return true;
    return false;  
}
  

const useHandlerError = (errorUnknow?: unknown) => {
  const [errorsForm, setErrorsForm] =  useState<IError[]>([])  
  const {toast} = useToastContext();
  const [error, setError] = useState<unknown | null>(errorUnknow);  
  const navigate = useNavigate();

  useEffect(() => {
    let errors:IError[] = [];
    if(isFormError(error)) {
        error.response.data.errors.forEach((error) => {
            errors = {...errors, [error.param]: error.msg}
        }) 
        setErrorsForm(errors);
    }
    else if(isAppError(error)) {
        const message = error.response.data.msg;
        if(message.toLowerCase() === 'token invalido'){
          setTimeout(() => {
            navigate('/login');
          },2000)
          toast('O seu token expirou, voce será redirecionado em 2 segundos',{status:'error', autoCloseIn:2000});
        }
        else 
            toast(`${error.response.data.msg}`,{status:'error', autoCloseIn:1000})
    }
  },[error])

  return (
    {
        handleError: setError,
        errors: errorsForm
    }
  )
}

export default useHandlerError