import "styled-components"
declare module 'styled-components' {
    export interface DefaultTheme 
    {
        border:string;
        
        colors: {
            firstBlack:string,
            secundaryBlack:string,
        
            background:string
        }
    }
}