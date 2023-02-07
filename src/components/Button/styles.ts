import styled from 'styled-components';

export const ButtonStyled = styled.button`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: ${({theme}) => theme.border};
  border: none;
  padding:0.3rem 0;
  cursor: pointer;
  outline: none;
  font-family: 'Source Code Pro', monospace;
  font-size: 1.6rem;

  &:hover {
    background-color: ${({theme}) => theme.colors.secundaryBlack};
  }
`;



