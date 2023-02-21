import React, { useState } from 'react'
import * as S from "./styles"
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext'

interface IProps {
  active: boolean;
  activate: React.Dispatch<React.SetStateAction<boolean>>;
}
const Profile = ({active, activate}:IProps ) => {
  const {user, logout} = useUserContext()

  return (
    <>
      <S.ContainerAvatar active={active}>
          <S.ContainerPhoto onClick={() => {activate(active => !active)}}>
              {user && <img src={`http://localhost:3333/avatar/${user?.avatar}`} alt="" />}
          </S.ContainerPhoto>
      <S.ActionsList>
          <S.ActionItem>
            <Link to='/usuario/editar'> Alterar Dados </Link>
          </S.ActionItem>
          <S.ActionItem onClick={logout}>Logout</S.ActionItem>
      </S.ActionsList>
      </S.ContainerAvatar>
    </>
  )
}

export default Profile