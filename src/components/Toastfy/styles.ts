import styled, { css, keyframes } from 'styled-components';


export const ContainerFixed = styled.div`
  position: fixed;
  top:10px;
  right: 10px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  z-index: 99999;
`;

const Slide = keyframes`
  from {
    transform: translateX(120px);
  }
  to {
    transform: translateX(initial);
  }
` 
export const Container = styled.div`
  min-width: 380px;
  background-color:#282828 ;
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0,0,0,30%);
  display: block;
  animation: ${Slide} 0.5s ease forwards;
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
`;

export const Message = styled.p `
    font-size: 20px;
    color: white;
`

export const FullBar = keyframes`
    0% {
      width: 0%;
    }
    95% {
      width: 95%;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    100% {
      width: 100%;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
` 

interface IProps {
  time:number;
  color: string;
}

export const Progress = styled.div`
    background-color: ${({color}:IProps) => color};
    height: 12px;
    animation: ${FullBar} ${({time}:IProps) => css`${time/1000}s ease-in forwards`} ;
`


