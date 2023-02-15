import React, { createContext, useEffect, useState } from 'react'
import {v1} from 'uuid'

interface IProps {
    children: JSX.Element;
}
interface IToastContext {
  deleteToast: (id:string) => void;
  toast: (message: string, options: IOptionsRequest) => void;
  toastItem: IToast[];
  desiredTime: number | undefined;
}
interface IOptionsRequest {
  status: "success"|"warning"|'error';
  autoCloseIn?: number
}

interface IToast {
  status: "success"|"warning"|'error';
  message: string;
  id: string;
}


export const ToastContext = createContext<IToastContext>({} as IToastContext);


const ToastProvider = ({children}:IProps) => {
  const [toastItem, setToastItem] = useState<IToast[]>([]);  
  const [autoCloseIn, setAutoCloseIn] = useState<number | undefined>(3000);

  const toast = (message: string, {status, autoCloseIn}:IOptionsRequest) => {
    setAutoCloseIn(autoCloseIn);
    setToastItem([...toastItem, {message, status, id: v1()}]);
  } 

  const exclude = (id:string) => {
    const toastRemaining =  toastItem.filter(toast => toast.id !== id); 
    setToastItem(toastRemaining);
  }
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if(autoCloseIn) {
      
      timeout = setTimeout(() => {
        const toast = toastItem.shift();
        if(toast)
          exclude(toast.id);
      }, autoCloseIn);
    }
    return () => {clearTimeout(timeout)}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[toastItem, autoCloseIn])
 
  return (
    <ToastContext.Provider value={
        {
            desiredTime: autoCloseIn,
            deleteToast:exclude,
            toast: toast,
            toastItem: toastItem
        }}>
        {children}
    </ToastContext.Provider> 
  )
}

export default ToastProvider;



