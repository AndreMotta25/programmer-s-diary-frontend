import React from 'react';
import * as S from './styles';
import {AiFillCheckCircle} from 'react-icons/ai';
import {CiWarning} from "react-icons/ci";
import {BiErrorCircle} from 'react-icons/bi';

import { useToastContext } from '../../hooks/useToast';

const color = {
  success: "#7FF946",
  warning: "#FFA51F",
  error: "#F61F1F"
} 
const flag = {
  success: (<AiFillCheckCircle size={'60px'} color="#7FF946"/>),
  warning: (<CiWarning size={'60px'} color="#FFA51F"/>),
  error: (<BiErrorCircle size={'60px'} color="#F61F1F"/>)
}

const ToastFy = () => {
  const {deleteToast, toastItem, desiredTime} = useToastContext();

  return (
    <>
        <S.ContainerFixed>
          {toastItem.map(item => 
            <S.Container onClick={() => deleteToast(item.id)} key={item.id}>
                <S.Content>
                    {flag[item.status]}
                    <S.Message>{item.message}</S.Message>
                </S.Content>
                <S.Progress time={desiredTime? desiredTime: 1000} color={color[item.status]}/>
            </S.Container>
          )}
        </S.ContainerFixed>
    </>
  )
}

export default ToastFy;


