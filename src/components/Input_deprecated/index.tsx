import React, { InputHTMLAttributes, useRef } from 'react'
import * as S from "./styles"


interface Props extends InputHTMLAttributes<HTMLInputElement>{
    label?:string,
    error?:string,
}

const Input = ({label, error, name, ...rest}: Props) => {
  const refT = useRef<HTMLLabelElement>(null)
  return (
    <S.Container>
        {label && 
        <S.Label htmlFor={name} ref={refT} >{label}</S.Label>}
        <S.Input name={name} {...rest} onFocus={() => refT.current?.classList.add("teste")} />
        {error && <S.Error>{error}</S.Error>}
    </S.Container>
    
  )
}

export default Input


// não está sendo utilizado em lugar nenhum