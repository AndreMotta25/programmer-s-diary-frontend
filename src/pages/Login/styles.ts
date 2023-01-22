import styled from 'styled-components';
import background from "../../assets/background_login.png" 
import { ButtonStyled } from '../../components/Button/styles';

export const ContainerBackground = styled.div`
  background: url(${background});
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Esse padding não vai deixar o container filho chegar no topo da pagina, assim o 
  empurrando para baixo */
  padding: 1.875rem 0;
`;

export const ContainerLogin = styled.div`
    width: 39.02777%;
    min-height: 80vh;
    background: linear-gradient(to right, #e981d9, #6d22c4);
    margin: 0 auto;
    border-radius: ${({theme}) => theme.border};
    padding: 2.188rem 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (min-width:1440px){
        max-width: 35%;
    }
    @media screen and (min-width:600px) and (max-width:840px){
        width: 60%;
    } 
    @media screen and (max-width:600px){
        width: 90%;
    } 
`;
export const ContainerElementos = styled.div`
  width: 51.601%;
  display: flex;
  flex-direction: column;
`
export const Header = styled.header`
  margin-bottom: 1.438rem;
  gap: 1.25rem;
  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
  display: block;
  margin:  0 auto;
`;


export const Title = styled.h1`
  font-family: 'Source Code Pro', monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  
  //! o codigo css abaixo(div...) é redundante, excluir depois.
  /*div {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.563rem;
  } */
`;

export const Button = styled(ButtonStyled)`
  padding: 0.75rem 0;
  color: #fff;
  width: 100%;
  margin-bottom: 0.563rem;
`; 

export const AuthenticationError = styled.p`
  border-radius: ${({theme}) => theme.border};
  text-align: center;
  background-color: rgba(0,0,0,40%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.60rem;
  color: red;
  font-weight:bold;
  /* width: 90%; */
  margin: 5% auto 10% auto;
`


export const Cadastrar = styled.div`
    width: 100%;
    text-align: center;
`; 