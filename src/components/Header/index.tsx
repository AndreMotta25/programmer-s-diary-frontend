import React from 'react'
import * as S from './styles'
import Profile from '../Profile'
import useShowElement from '../../hooks/useShowElement'
import { ICard } from '../../@types/ICard'
import { cardAPI } from '../../api'
import useHandlerError from '../../hooks/useHandlerError'
import { useToastContext } from '../../hooks/useToast'


interface IHeader {
  activeCard: ICard | null;
  cards: ICard[];
  insertCards: React.Dispatch<React.SetStateAction<ICard[]>>
}

const Header = ({activeCard, cards, insertCards}:IHeader) => {
  const {handleError} = useHandlerError();
  const {toast} = useToastContext();
  const activationHandler = useShowElement();

  const updatesCardInRealTime = () => {
    const cardExist = cards.find((card) => card.id === (activeCard as ICard).id);
    
    if(cardExist && activeCard) {    
      Object.assign(cardExist,{...activeCard, save:true});
      insertCards([...cards]);
    }
  }

  const handleClickSave = async () => {
    if(activeCard)
    {
      try{
        await cardAPI.putCard(activeCard);
        toast('Salvo com sucesso',{status:'success',autoCloseIn:1000})
      }
      catch(e) {
        handleError(e);
      }
    }

      
    updatesCardInRealTime();
  }
  return (
    <S.Header active={activationHandler.active}>
      <Profile active={activationHandler.active} activate={activationHandler.setActive}/>
      <S.Action onClick={handleClickSave} disabled={activeCard === null}>
        Salvar
      </S.Action>
    </S.Header>
  )
}

export default React.memo(Header);