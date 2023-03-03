import React, { useState , MouseEvent,useEffect, useCallback} from 'react'
import * as S from './styles'
import Search from '../Search'
import { ICard } from '../../@types/ICard';
import Card from '../Card';
import {BsSortAlphaDownAlt} from 'react-icons/bs'
import { sort } from '../../utils/sort';

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

type Order = {date:string; alphabetical:string;};

const Menu = ({research, search, modalController, cards, updateCard, clearModal, activeCard, deleteCard}:IMenu) => {
  const [order, setOrder] = useState<"date"|"alphabetical">("date");  
  const [active, setActive] = useState(false);

  const arrange = useCallback((order: "date"|'alphabetical') => {
    if(order === 'alphabetical') {
      return sort(cards,'name');
    }
    if(order === 'date') {
      return sort(cards,'update_date').reverse();
    }
    return cards;
  },[cards])

  const handleOrder = ({target}: MouseEvent<HTMLElement>) => {
    if(target instanceof HTMLElement){
      setOrder(target.dataset['order'] as keyof Order);
    }
      
  }
  
  const [cardsOrdered, setCardsOrdered] = useState(arrange('date'));
  
  const activeModal = () => {
    clearModal();
    modalController.activeElement();
  }

  const activeButton = () => {
    setActive(active => !active);
  }

  useEffect(() => {
    setCardsOrdered([...arrange(order)]);
  },[cards, order, arrange])

  return (
    <S.Container>
        <Search value={search} onChange={({target}) => research(target.value)}/>
        
        <S.Sort>
          <S.SortButton onClick={activeButton}>
            <BsSortAlphaDownAlt/>
            <S.SortList active={active}>
              <S.SortOptions onClick={handleOrder} selected={order === 'alphabetical'}  data-order='alphabetical'>Alfabética</S.SortOptions>
              <S.SortOptions onClick={handleOrder} selected={order === 'date'} data-order='date'>Data</S.SortOptions>
            </S.SortList>
          </S.SortButton>
        </S.Sort>
        <S.ContainerCards>
          {
            cardsOrdered && cardsOrdered.map((card) => (
              <Card card={card} key={card.id} updateCard={updateCard} isActive={card.id === activeCard?.id} deleteCard={deleteCard}/>
            ))
          }
        </S.ContainerCards>
        <S.Button onClick={activeModal}>Criar Card</S.Button>
    </S.Container>
  )
}

export default Menu