import styled from 'styled-components';
import { ContainerBackground } from '../Home/styles';

export const Container = styled(ContainerBackground)`
  
`;


export const MessageBox = styled.div`
    background: linear-gradient(to right, #e981d9, #6d22c4);
    padding: 2rem;
    border-radius: ${({theme}) => theme.border};
    min-width: 15%;
`

export const Message = styled.div`
    font-family: 'Source Code Pro', monospace;
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
`

