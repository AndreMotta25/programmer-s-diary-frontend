import React, { ReactNode, useRef, MouseEvent } from 'react'
import * as S from './styles' 
 
interface IController {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  activeElement: () => void;
  isActive: () => boolean;
}

interface IProps {
    children: ReactNode;
    controller: IController;
}

const Modal = ({children, controller }:IProps) => {
  const refShadowContainer = useRef<HTMLDivElement>(null)

  const handleClick = ({target}: MouseEvent<HTMLDivElement>) => {
    if(target === refShadowContainer.current) {
      controller.activeElement();
    }
  }

  return (
    <>
      {controller.active && 
        <S.ShadowContainer ref={refShadowContainer} onClick={handleClick}>
            <S.Container>
                {children}
            </S.Container>
        </S.ShadowContainer>
      }
    </>
  )
}

export default Modal