import React, { useState} from 'react'
import { AiFillDelete } from 'react-icons/ai';
import useShortText, { IShortText } from '../../hooks/useShortText';
import { ICard } from '../../@types/ICard'
import * as S from './styles' 
import { BiEdit } from 'react-icons/bi';
import useShowElement from '../../hooks/useShowElement';
import Modal from '../Modal';

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
  const modalController = useShowElement();

  const handleDescription = () =>  {
    handleClickDescription();
    setActive(!active);
  }
  const remove = () => {
    deleteCard(card.id)
  }

  return (
    <>
    <S.Container  extendCard={active} isActive={isActive}>
        <S.Title>
          <S.Name>{card.name}</S.Name>
          {card?.save !== undefined && !card?.save && <S.Unsaved/>}
        </S.Title>
        
        <S.Description  onClick={handleDescription}>
          {description}
        </S.Description>
        <S.Extras >
          <S.TypeLanguage>
            {card.language}
          </S.TypeLanguage>
          <S.Actions>
          <S.Button  onClick={modalController.activeElement}>
            <AiFillDelete size={'100%'}/>
          </S.Button>
          <S.Button  onClick={() => {updateCard(card)}}>
            <BiEdit size={'100%'}/>
          </S.Button>
          </S.Actions>
        </S.Extras>
    </S.Container>
      <Modal controller={modalController}>
        <S.DeleteModal>
          <S.DeleteTitle>Tem certeza que deseja deletar?</S.DeleteTitle>
          <S.Decisions>
            <S.ButtonDelete onClick={remove}>Excluir</S.ButtonDelete>
            <S.CancelButton onClick={modalController.activeElement}>Cancelar</S.CancelButton>
          </S.Decisions>
        </S.DeleteModal>    
      </Modal>
  </>
  )
}

export default React.memo(Card)