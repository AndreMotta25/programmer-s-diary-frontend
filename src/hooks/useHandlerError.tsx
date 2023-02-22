import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
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
        if(message.toLowerCase() === 'token invalido')
            toast('O seu token expirou, faça login novamente',{status:'error'});
        else 
            toast("Ocorreu um erro, faça login novamente.",{status:'error'})
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