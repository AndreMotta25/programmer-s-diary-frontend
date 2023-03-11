import styled from 'styled-components';
import { Field } from "formik"


export const Container = styled.div`
  margin-bottom: 2rem;
  margin-bottom: 12%;
  gap: 0 !important;
  position: relative;
`;
export const Input = styled(Field)`
  width: 100%;
  padding: 0.75rem 0.75rem  0.75rem 0.75rem ;
  border-radius: ${({theme}) => theme.border};
  outline: none;
  border: none;
`;

export const Label = styled.label`
  position: relative;
  text-align: left;
  text-transform: capitalize;
  margin-bottom: 2px;
  font-family: 'Source Code Pro', monospace;
  font-weight: bold;
  color: #fff;
  letter-spacing: 0.15rem;
  visibility: hidden;
  opacity: 0;

  &.teste {
    visibility: visible;
    opacity: 1;
  }
`

export const Error = styled.span`
  color: #F32323;
  font-weight: bold;
  width: 100%;
  text-align: left;
`;