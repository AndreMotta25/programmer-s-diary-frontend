import { Link } from 'react-router-dom';
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
  padding: 3rem 0;
`;

export const ContainerLogin = styled.div`
    width: 100%;
    max-width: 56.2rem;
    background: linear-gradient(to right, #e981d9, #6d22c4);
    margin: 0 auto;
    border-radius: ${({theme}) => theme.border};
    padding: 10rem 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (min-width:1440px){
        max-width: 30%;
    }
    @media screen and (min-width:600px) and (max-width:840px){
        width: 60%;
    } 
    @media screen and (max-width:600px){
        width: 90%;
    } 
`;
export const ContainerElementos = styled.div`
  width: 51.601423487544%;
  display: flex;
  flex-direction: column;
`
export const Header = styled.header`
  margin-bottom: 2.3rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
  display: block;
  margin:  0 auto;
`;


export const Title = styled.h1`
  font-family: 'Source Code Pro', monospace;
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  position:relative;
`;

export const Button = styled(ButtonStyled)`
  padding: 1.2rem 0;
  color: #fff;
  width: 100%;
  margin-bottom: 0.9rem;
  margin-top: 1rem;
`; 

export const AuthenticationError = styled.p`
  border-radius: ${({theme}) => theme.border};
  text-align: center;
  background-color: rgba(0,0,0,40%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.96rem;
  color: red;
  font-weight:bold;
  margin: 5% auto 10% auto;
`


export const Cadastrar = styled.div`
    width: 100%;
    text-align: center;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    
    & > * {
      color: #fff;
      text-decoration:none;
      font-family: 'Source Code Pro', monospace;
    } 
`; 

export const ResetPassword = styled(Link)`
  position: relative;
  bottom: 1.3rem;
  display: block;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  font-family: 'Source Code Pro', monospace;
  text-align: end;
`