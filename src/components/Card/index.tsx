import React, { useState} from 'react'
import { AiFillDelete } from 'react-icons/ai';
import useShortText, { IShortText } from '../../hooks/useShortText';
import { ICard } from '../../@types/ICard'
import * as S from './styles' 
import { BiEdit } from 'react-icons/bi';

interface IProps {
    card: ICard
    updateCard: (card:ICard) => void;
    isActive: boolean;
    deleteCard: (id:string) => void;
}

const Card = ({card, updateCard, isActive, deleteCard}:IProps) => {
  const descriptionShort: IShortText = {text:card.description, len:50}

  const [description, handleClickDescription] = useShortText(descriptionShort);
  const [active, setActive] = useState(false);


  const handleDescription = () =>  {
    handleClickDescription();
    setActive(!active);
  }

  return (
    <S.Container  extendCard={active} isActive={isActive}>
        <S.Name>{card.name}</S.Name>
        <S.Description  onClick={handleDescription}>
          {description}
        </S.Description>
        <S.Extras >
          <S.TypeLanguage>
            {card.language}
          </S.TypeLanguage>
          <S.Actions>
          <S.Button  onClick={() => {deleteCard(card.id)}}>
            <AiFillDelete size={'100%'}/>
          </S.Button>
          <S.Button  onClick={() => {updateCard(card)}}>
            <BiEdit size={'100%'}/>
          </S.Button>
          </S.Actions>
        </S.Extras>
        
    </S.Container>
  )
}

export default React.memo(Card)