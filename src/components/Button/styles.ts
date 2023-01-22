import styled from 'styled-components';

export const ButtonStyled = styled.button`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: ${({theme}) => theme.border};
  border: none;
  padding:0.188rem 0;
  cursor: pointer;
  outline: none;
`;
