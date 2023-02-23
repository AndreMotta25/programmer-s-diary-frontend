import React from 'react'
import * as S from './styles'
import Search from '../Search'
import { ICard } from '../../@types/ICard';
import Card from '../Card';


interface IModalController {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  activeElement: () => void;
  isActive: () => boolean;
}

interface IMenu {
  research: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  modalController: IModalController;
  cards: ICard[],
  updateCard: (card:ICard) => void;
  clearModal: () => void;
  activeCard: ICard | null;
  deleteCard: (id:string) => void;
}

const Menu = ({research, search, modalController, cards, updateCard, clearModal, activeCard, deleteCard}:IMenu) => {
  const activeModal = () => {
    clearModal();
    modalController.activeElement();
  }

  return (
    <S.Container>
        <Search value={search} onChange={({target}) => research(target.value)}/>
        <S.ContainerCards>
          {
            cards.map((card) => (
              <Card card={card} key={card.id} updateCard={updateCard} isActive={card.id === activeCard?.id} deleteCard={deleteCard}/>
            ))
          }
        </S.ContainerCards>
        <S.Button onClick={activeModal}>Criar Card</S.Button>
    </S.Container>
  )
}

export default React.memo(Menu)