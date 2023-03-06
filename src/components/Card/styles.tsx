import styled from 'styled-components';
import { ButtonInherit } from '../../pages/Home/styles';


interface IProps {
  extendCard:boolean;
  isActive?: boolean;
}

export const Container = styled.div`
  width: 100%;
  border: 0.2rem solid ${({isActive}) => isActive? '#fff' :'#282828'} ;
  border-radius: 1rem;
  padding: 0.8rem;
  min-height: ${({extendCard}:IProps) => (extendCard && 'auto')};
  flex: 0 0 13.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;
export const Name = styled.h3`
    font-size: 1.8rem;
    color: #fff;
    font-family: "Source Code Pro", monospace;
`
export const Description = styled.p`
    font-size: 1.4rem;
    color: #fff;
    font-family: "Source Code Pro", monospace;
    margin-top: 10px;
    margin-bottom: 20px;
    cursor: pointer;
    
    &:hover {
      color: #282828;
    }
`

export const Extras = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
export const TypeLanguage = styled.span`
  background-color: #282828;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: fit-content;
  color: #fff;
  font-family: "Source Code Pro", monospace;
  flex:4 0 100px ;

  &:hover {
      color: #46FC42;
  }
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  flex:1 0 auto ;
`

export const Button = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;  
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;

  &:hover {
    color: #dd2727;
  }
`
export const DeleteModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`
export const DeleteTitle = styled.h2`
  font-family: 'Source Code Pro', monospace;
  font-size: 2rem;
  font-weight: bold;
`
export const Decisions = styled.div`
  display: flex;
  gap: 20px;
`

export const ButtonDelete = styled(ButtonInherit)`
    color: #282828;
    background-color: #F94E4E;
`
export const CancelButton = styled(ButtonInherit)``

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const Unsaved = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #fff;
`