import styled from 'styled-components';
import { ButtonStyled } from '../Button/styles';

export const Container = styled.div`
  background-color: transparent;
  padding:3rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContainerCards = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  height: 50vh;
  width: 100%;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Button = styled(ButtonStyled)`
  position: absolute;
  bottom:3rem;
  padding: 0.8rem;
  color: #fff;
  margin: 0 auto;
  align-self: center;
`
export const Sort = styled.div`
  width: 100%;
  height: 2.5rem;
  position: relative;
  display: flex;
  justify-content: end;
  margin-bottom: 0.5rem;
  align-items: center;
`

export const SortButton = styled.button`
  height: 100%;
  padding: none;
  background-color: #282828;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  & svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`
interface ISortList {
  active: boolean
}
export const SortList = styled.ul`
  position: absolute;
  right: -32px;
  background-color: #282828;
  z-index: 99999;
  top: 30px;
  border-radius: ${({theme}) => theme.border};
  padding: 0.5rem;
  box-shadow: 4px 4px 4px rgba(0,0,0,30%);
  align-items: center;
  justify-content: center;
  display: ${({active}:ISortList) => (active && 'flex') || 'none'};
  flex-direction: column;


  &::before {
    content: '';
    display: flex;
    width: 0; 
    height: 0; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #282828;
    margin: 0 auto;
    position: absolute;
    top: -7px;
    ;
  }
`
interface ISortOptions {
  selected: boolean;
}
export const SortOptions = styled.li`
  padding: 0.5rem;
  font-family: 'Source Code Pro', monospace;
  width: 100%;

  &:hover {
    background-color: ${({theme}) => theme.colors.secundaryBlack};
  }

  color: ${({selected}:ISortOptions) => (selected && '#46FC42') || '#fff'}
`
