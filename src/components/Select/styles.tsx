import styled, { css } from "styled-components"

interface ISelect {
    error?:string;
}

export const Container = styled.div`
    position: relative;
`

export const Select = styled.select`
    width: 100%;
    border-radius: 0.5rem;
    padding: 1rem;
    outline: none;
    border: none;
    background-color: #E9E3E3;
    font-family: 'Source Code Pro', monospace;
    color: gray;

    ${({error}:ISelect) => error && css`border: 2px solid red` }
`

export const ContainerError = styled.div`
    position: absolute;
    display: flex;
    padding:1rem;
    right: 1rem;
    top: 0.3rem;
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
        top: -0.9rem;
        left: 0;
    }
    
`
