import React, { ReactNode } from 'react'
import * as S from './styles' 

interface IProps {
    children: ReactNode
}

const ContainerGeneric = ({children}:IProps) => {
  return (
    <S.Container>
        <S.Box>{children}</S.Box>
    </S.Container>
  )
}

export default ContainerGeneric