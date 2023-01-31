import styled from "styled-components";

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
` 