import React from 'react'
import * as S from "./styles"

interface Props {
    label:string
}

const Button = ({label}:Props) => {
  return (
    <S.ButtonStyled>{label}</S.ButtonStyled>
  )
}

export default Button