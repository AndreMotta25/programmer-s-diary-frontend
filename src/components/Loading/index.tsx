import React from 'react'
import * as S from "./styles"
import {AiOutlineLoading3Quarters} from "react-icons/ai"

const Loading = () => {
  return (
    <S.Container>
        <AiOutlineLoading3Quarters size={'100%'} color="white"/>
    </S.Container>
  )
}

export default Loading