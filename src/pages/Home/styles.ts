import styled from "styled-components";
import { ButtonStyled } from "../../components/Button/styles";

export const ContainerBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #28053f;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ContainerDefault = styled.main`
  width: 80%;
  min-height: 80vh;
  background: linear-gradient(to right, #e981d9, #6d22c4);
  display: flex;
`;

export const ContainerBlack = styled.div`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
    padding:3rem;
    display: flex;
    flex-direction: column;
` 

export const ContainerModal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const ContainerInput = styled.div`
  width: 100%;
`

export const ContainerForm = styled.div`
  display: flex;
  gap: 20px;
`

export const ButtonInherit = styled(ButtonStyled)`
  padding: 0.5rem 3rem;
  font-size: 1.6rem;
  color: #fff;
  margin: 0 auto;
  display: block;
`

