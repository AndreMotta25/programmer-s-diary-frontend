import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { Link } from 'react-router-dom'
import Profile from '../Profile'
import useShowElement from '../../hooks/useShowElement'
import { ICard } from '../../pages/Home'

interface IHeader {
  activeCard: ICard | null;
  cards: ICard[];
  insertCards: React.Dispatch<React.SetStateAction<ICard[]>>
}

const Header = ({activeCard, cards, insertCards}:IHeader) => {

  const activationHandler = useShowElement();

  const updatesCardInRealTime = () => {
    const cardExist = cards.find((card) => card.id === (activeCard as ICard).id);
    
    if(cardExist) {
      Object.assign(cardExist,activeCard);
      insertCards([...cards]);
    }
  }

  const handleClickSave = () => {
    console.log('salvando');
    
    updatesCardInRealTime();
  }
  
  console.log(cards);
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