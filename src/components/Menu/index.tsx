import React from 'react'
import * as S from './styles'
import Search from '../Search'


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
}
const Menu = ({research, search, modalController}:IMenu) => {
  return (
    <S.Container>
        <Search value={search} onChange={({target}) => research(target.value)}/>

        <button onClick={modalController.activeElement} >Ativar Modal</button>
    </S.Container>
  )
}

export default Menu