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