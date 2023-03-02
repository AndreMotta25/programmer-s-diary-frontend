import styled, { css } from 'styled-components';

interface IProps {
    active:boolean
}

export const Header = styled.header`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: flex-start;

  ${({active}:IProps) => active? css`
    margin-bottom: 5.7rem;
  `: null}
`;



export const Action = styled.button`
  background-color: transparent;
  padding: 1rem 1rem 1rem 1rem;
  border: 2px solid #fff;
  margin:0 0 0 auto;
  border-radius: 10px;
  font-family: 'Source Code Pro', monospace;
  color: #fff;
  cursor: pointer;

  &:enabled:hover {
    border-color: #46FC42;
    color: #46FC42;
  }
  &:disabled {
    border-color:#9F9E9E;
    cursor: not-allowed;
  }
`

