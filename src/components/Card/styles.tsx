import styled from 'styled-components';


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
  cursor: pointer;
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

    &:hover {
      color: #282828;
    }
`
export const TypeLanguage = styled.span`
  background-color: #282828;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: fit-content;
  color: #fff;
  font-family: "Source Code Pro", monospace;

  &:hover {
      color: #46FC42;
  }
`

export const Extras = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`
export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

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
