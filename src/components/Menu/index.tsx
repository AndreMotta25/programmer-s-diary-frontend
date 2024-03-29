import React, { useState , MouseEvent,useEffect, useCallback} from 'react'
import * as S from './styles'
import Search from '../Search'
import { ICard } from '../../@types/ICard';
import Card from '../Card';
import {BsSortAlphaDownAlt} from 'react-icons/bs'
import { sort } from '../../utils/sort';
import Loading from '../Loading';
import useShowElement from '../../hooks/useShowElement';

interface IModalController {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  activeElement: () => void;
  isActive: () => boolean;
}

interface IMenu {
  modalController: IModalController;
  cards: ICard[],
  updateCard: (card:ICard) => void;
  clearModal: () => void;
  activeCard: ICard | null;
  deleteCard: (id:string) => void;
  loading: boolean;
}

type Order = {date:string; alphabetical:string;};

const Menu = ({modalController, cards, updateCard, clearModal, activeCard, deleteCard ,loading}:IMenu) => {
  const [order, setOrder] = useState<"date"|"alphabetical">("date");  
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState('');
  const {activeElement, active:isActive} = useShowElement();

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
    if(search){
      const foundCards = cards.filter((elem:ICard) => elem.name.includes(search)).length > 0 
                                                      ?cards.filter((elem:ICard) => elem.name.includes(search))
                                                      :cards.filter((elem:ICard) => elem.language.includes(search)) ;
      setCardsOrdered(foundCards);
    }
    else           
      setCardsOrdered([...arrange(order)]);
  },[search,cards,arrange,order])
  
  useEffect(() => {
    setCardsOrdered([...arrange(order)]);
  },[cards, order, arrange])

  


  return (
    <>
      <S.ButtonMobileOn onClick={() => {activeElement()}}>Menu</S.ButtonMobileOn>
      <S.Container isActive={isActive}>
          <Search value={search} onChange={({target}) => setSearch(target.value)}/>       
          <S.Sort>
            <S.SortButton onClick={activeButton}>
              <BsSortAlphaDownAlt/>
              <S.SortList active={active}>
                <S.SortOptions onClick={handleOrder} selected={order === 'alphabetical'}  data-order='alphabetical'>Alfabética</S.SortOptions>
                <S.SortOptions onClick={handleOrder} selected={order === 'date'} data-order='date'>Data</S.SortOptions>
              </S.SortList>
            </S.SortButton>
            <S.ButtonMobileOff onClick={() => {activeElement()}}>Fechar Menu</S.ButtonMobileOff>
          </S.Sort>
          <S.ContainerCards>
            {
              !loading && cardsOrdered && cardsOrdered.map((card) => (
                <Card card={card} key={card.id} updateCard={updateCard} isActive={card.id === activeCard?.id} deleteCard={deleteCard}/>
              ))
            }
            {
              !loading && cardsOrdered.length <= 0 && <p>Crie um card</p>
            }
            {loading && <Loading/>}
          </S.ContainerCards>
          <S.Button onClick={activeModal}>Criar Card</S.Button>
      </S.Container>
    </>
  )
}

export default Menu