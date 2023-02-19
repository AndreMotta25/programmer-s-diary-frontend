import React, { useState , MouseEvent, useRef} from 'react'
import { AiFillDelete } from 'react-icons/ai';
import useShortText, { IShortText } from '../../hooks/useShortText';
import { ICard } from '../../@types/ICard'
import * as S from './styles' 

interface IProps {
    card: ICard
    fillModal: (card:ICard) => void;
    isActive: boolean;
    deleteCard: (id:string) => void;
}

const Card = ({card, fillModal, isActive, deleteCard}:IProps) => {
  const descriptionShort: IShortText = {text:card.description, len:50}

  const [description, handleClickDescription] = useShortText(descriptionShort);
  const [active, setActive] = useState(false);

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null) 


  const handleOpeningModal = (e: MouseEvent) => {
    if(e.target !== descriptionRef.current && !containerRef.current?.contains(e.target as HTMLElement)) {
      fillModal(card)
    }
    console.log(e)
  }
  
  const handleDescription = () =>  {
    handleClickDescription();
    setActive(!active);
  }

  return (
    <S.Container  onClick={handleOpeningModal} extendCard={active} isActive={isActive}>
        <S.Name>{card.name}</S.Name>
        <S.Description ref={descriptionRef} onClick={handleDescription}>
          {description}
        </S.Description>
        <S.Extras ref={containerRef}>
          <S.TypeLanguage>
            {card.language}
          </S.TypeLanguage>
          <S.Button  onClick={() => {deleteCard(card.id)}}>
            <AiFillDelete size={'100%'}/>
          </S.Button>
        </S.Extras>
        
    </S.Container>
  )
}

export default React.memo(Card)