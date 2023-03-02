import styled, { css } from 'styled-components';
import * as Animations from "./animations" 


type Variant =  "solid"|"standard";

interface ILabel {
    variant: Variant;
}
interface IInput {
    variant: Variant;
    focus: boolean;
    error?:string;
}

const inputStyles = {
    standard: ({focus, error}:IInput) => css`
        border: 2px solid gray;
        border-top: 0;
        border-left: 0;
        border-right:0;
        background-color: transparent;
        
        ${() => focus ? 
            css`
                & ~ label{
                    animation: ${Animations.slidToUpStandard} ease 0.5s forwards !important;
                    
                    color:red;
                }
            `: 
            css`
                & ~ label{
                    animation: ${Animations.slidToDownStandard} ease 0.5s forwards !important;
                }
            `
        }
         ${() => error &&
            css`
                && ~ label {
                    color: red;
                    font-weight: 500;
                }

                && {
                    border: 2px solid red;
                }
            `
        }    
    `,

    solid: ({focus, error}:IInput) => css`
        border: none;
        background-color: #E9E3E3 ;
        padding: 2rem 1rem 0.5rem 1rem  ;
        border-radius: 0.5rem;
       

        ${() => focus? 
            css`
                & ~ label{
                    animation: ${Animations.slidToUpSolid} ease 0.5s forwards !important;
                    width: 100%;
                    pointer-events: none;
                }
            `: 
            css`
                & ~ label{
                    animation: ${Animations.slidToDownSolid} ease 0.5s forwards !important;
                }
            `
        }

        ${() => error &&
            css`
                && ~ label {
                    color: red;
                    font-weight: 500;
                }

                && {
                    border: 0.2rem solid red;
                }
            `
        }
        
    `
}

const LabelStyles = {
    standard: () => css`
        left: 0;
        font-size: 1.8rem;
    `,
    solid: () => css`
        left: 1rem;
        font-size: 1.6rem ;  
    `
}

interface IContainer {
    width?: string;
    marginBottom?: string;
}
export const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({width}:IContainer) => width? width : '100%'};
    margin-bottom: ${({marginBottom}:IContainer) => marginBottom? marginBottom : '10%'};

    @media screen and (min-width: 1440px) {
        margin-bottom: 8%;
    } 
`;



export const InputElement =  styled.input`
    padding: 1.1rem 0.5rem 0.5rem 0.2rem;
    outline: none;
    width: 100%;
    font-family: 'Roboto Slab', serif;
    ${
        ({variant}:IInput) => inputStyles[variant] 
    }
`

export const Label = styled.label`
    position: absolute;
    color: gray;
    cursor: text;
    ${({variant}:ILabel) => LabelStyles[variant]}

    
`;

export const ContainerError = styled.div`
    position: absolute;
    display: flex;
    padding:1rem;
    right: 0.2rem;
    cursor: pointer;

    && > * {
        color: red;
        cursor: pointer;
    }
    &&:hover span {
        display: flex;
    }

    
`

export const Error = styled.span`
    position: absolute;
    background-color: white;
    padding: 1rem;
    display: none;
    top: 3.2rem;
    border-radius: 0.5rem;
    box-shadow: 0.4rem 0.4rem 0.4rem rgba(0,0,0,20%);
    z-index: 9999;
    width: max-content;
    max-width: 300px;
    &::before {
        content: '';
        width: 0; 
        height: 0; 
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
        border-bottom: 1rem solid #fff;
        position: absolute;
        top: -0.9rem;
        left: 0;
    }
    
    @media screen and (max-width:900px) {
        width: auto;
        max-width: 300px;
    }
`


export const TesteHeranca = styled(InputElement)`
    && {
        /* border-bottom: 2px solid gray; */
        border-radius: 5px;
       
        & ~ label {
            color: red;
        }

        &:focus {
            border-color: blue;
        }
        &:focus ~ label {
            color: blue;
        }
    }
    

`