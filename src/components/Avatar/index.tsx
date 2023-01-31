import React, { useState } from 'react'
import * as S from "./styles"
import lotus from './lotus.jpg'

interface IProps {
  active: boolean;
  activate: React.Dispatch<React.SetStateAction<boolean>>;
}
const Profile = ({active, activate}:IProps ) => {
  
  const handleClickLogout = () => {
    console.log('fazendo logout');
  }

  return (
    <>
    <S.ContainerAvatar active={active}>
        <S.ContainerPhoto onClick={() => {activate(active => !active)}}>
            <img src={lotus} alt="" />
        </S.ContainerPhoto>
    <S.ActionsList>
        <S.ActionItem>Alterar Dados</S.ActionItem>
        <S.ActionItem onClick={handleClickLogout}>Logout</S.ActionItem>
    </S.ActionsList>
    </S.ContainerAvatar>
    
    </>
  )
}

export default Profile