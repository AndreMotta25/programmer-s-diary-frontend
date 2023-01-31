import React, { useState } from 'react'
import * as S from './styles'
import { Link } from 'react-router-dom'
import Profile from '../Avatar'


const Header = () => {
  const [active, setActive] = useState(false);

  const handleClickSave = () => {
    console.log('salvando')
  }

  return (
    <S.Header active={active}>
      <Profile active={active} activate={setActive}/>
      <S.Action onClick={handleClickSave}>
        Salvar
      </S.Action>
    </S.Header>
  )
}

export default Header