import styled, { css, keyframes } from 'styled-components';


interface IProps {
    active: boolean;
}

const SlideAvatar = keyframes`
    to {
        transform: translateX(38%);
        
    }
`

const SlideAvatarBack = keyframes`
    from {
        transform: translateX(38%);
    }
    to {
        transform: translateX(0%);
    }
`

export const ContainerAvatar = styled.div`
  position: relative;
  flex-shrink: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  

  ${({active}:IProps) =>
   active ?
   css`
    & {
        position: absolute;
        border-radius: 1rem;
        background-color: #282828;
        transition: all 0.5s;
        border-bottom:1px solid #fff ;
        border-right: 1px solid #fff;
        ul {
            opacity: 1;
            visibility: visible;
            transition: all 1s ease ;
            position: relative;
            align-self: center;
        }
        div {
            animation: ${SlideAvatar} ease-in 0.5s forwards;
        }
   }`:
   css`
    div 
    {
        animation: ${SlideAvatarBack} ease-in 0.5s forwards;
    }
   `

}

`;

export const ContainerPhoto = styled.div`  
  border-radius: 50%;
  width: 7.6rem;
  height: 7.6rem;
  position: relative;
  z-index: 99999;
  cursor: pointer;


  & img {
    width: 100%;
    display: block;
    height: 100%;
    border-radius: 50%;
    border: 0.2rem solid #fff; 
  }

  &:hover::before {
        content:'';
        width: 7.6rem;
        height: 7.6rem;
        display: block;
        background-color: rgba(0,0,0,40%);
        position: absolute;
        z-index: 9999999;
        border-radius: 50%;
    }
  
`;

export const ActionsList = styled.ul`
    opacity: 0;
    visibility: hidden;
    align-self: flex-end;
    position: absolute;
    border-radius: 10px;
    padding: 0.5rem;
    transform: translateY(5px);
    gap: 1rem;
    top: -0.8rem;
`
export const ActionItem = styled.li`
    color: #fff;
    text-align: center;
    padding: 0.5rem;
    width: 100%;
    font-family: 'Source Code Pro', monospace;
    cursor: pointer;

    & > * {
        color: white;
        text-decoration: none;

    }
    &:hover {
        background-color: ${({theme}) => theme.colors.secundaryBlack};
        border-radius: 1rem;
    }
`
