import styled from 'styled-components';
import { ButtonStyled } from '../../components/Button/styles';
import { ContainerBackground as Background } from '../Login/styles';


export const ContainerBackground = styled(Background)`
  padding: 3rem 2rem;
`;

export const Container = styled.div`
    padding:2rem;
    background: linear-gradient(to right, #e981d9, #6d22c4);
    width: 100%;
    max-width: 50rem;
    border-radius: ${({theme}) => theme.border};
`
export const List = styled.ul`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom:3rem;
   flex-wrap: wrap;
   row-gap: 15px;
`
export const ListItem = styled.li`
  
   & > * {
    border-radius: ${({theme}) => theme.border};
    font-family: 'Roboto Slab', serif;
    display: block;
    padding: 1.2rem 2.5rem;
    background-color: #fff;
    text-decoration: none;
    color: #000;

    &:hover {
      background-color: ${({theme}) => theme.colors.background};
      color: #fff;
    }
   }
`

// sons
export const ContainerUpdate = styled.div`
  & > div {
    margin-bottom: 5%;
  }
`;

export const Button = styled(ButtonStyled)`
    padding: 1rem 6.7rem;
    margin: 0 auto;
    display: block;
    color: #fff;
`;


