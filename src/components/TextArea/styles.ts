import styled, { css } from 'styled-components';
import * as Animations from "../Input/animations";


type Variant =  "solid"|"standard";

interface ILabel {
    variant: Variant;
}
interface ITextArea {
    variant: Variant;
    focus: boolean;
    error?:string;
}

const TextAreaStyles = {
    standard: ({focus, error}:ITextArea) => css`
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

    solid: ({focus, error}:ITextArea) => css`
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
    width: ${({width}:IContainer) => width? width : '100%'};
    margin-bottom: ${({marginBottom}:IContainer) => marginBottom? marginBottom : '10%'};
    height: 150px;

    @media screen and (min-width: 1440px) {
        margin-bottom: 8%;
    } 
`;



export const TextAreaElement =  styled.textarea`
    padding: 1.1rem 0.5rem 0.5rem 0.2rem;
    outline: none;
    width: 100%;
    height: 100%;
    resize: none;
    overflow: auto;
    font-family: 'Source Code Pro', monospace;
    
    ${
        ({variant}:ITextArea) => TextAreaStyles[variant] 
    }
`

export const Label = styled.label`
    position: absolute;
    color: gray;
    cursor: text;
    top: 10px;

    ${({variant}:ILabel) => LabelStyles[variant]}

    
`;

export const ContainerError = styled.div`
    position: absolute;
    display: flex;
    padding:1rem;
    top: 0.4rem;
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

    &::before {
        content: '';
        width: 0; 
        height: 0; 
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
        border-bottom: 1rem solid #fff;
        position: absolute;
        left: 0;
        top: -0.9rem;
    }
    
`