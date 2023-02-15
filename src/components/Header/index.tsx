import React, { useState } from 'react'
import * as S from './styles'
import { Link } from 'react-router-dom'
import Profile from '../Profile'
import useShowElement from '../../hooks/useShowElement'

interface IHeader {
  code: string;
}
const Header = ({code}:IHeader) => {

  const activationHandler = useShowElement();

  const handleClickSave = () => {
    console.log('salvando');
  }

  return (
    <S.Header active={activationHandler.active}>
      <Profile active={activationHandler.active} activate={activationHandler.setActive}/>
      <S.Action onClick={handleClickSave}>
        Salvar
      </S.Action>
    </S.Header>
  )
}

export default React.memo(Header);