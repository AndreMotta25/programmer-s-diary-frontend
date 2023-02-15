import React, { useState } from 'react'
import * as S from "./styles"
import lotus from './lotus.jpg'
import { Link } from 'react-router-dom';

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
        <S.ActionItem>
          <Link to='/usuario/editar'> Alterar Dados </Link>
        </S.ActionItem>
        <S.ActionItem onClick={handleClickLogout}>Logout</S.ActionItem>
    </S.ActionsList>
    </S.ContainerAvatar>
    
    </>
  )
}

export default Profile