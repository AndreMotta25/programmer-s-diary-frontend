import { keyframes } from 'styled-components';

export const slidToUpStandard = keyframes`
    from {
        transform: translate(0px, 0px); 
    }
    to {
       transform: translate(0px, -20px);
       font-size: 14px;
       background-color: transparent;
       padding: 2px;
       font-weight: bold;
    }
`

export const slidToDownStandard = keyframes`
    from {
        transform: translate(0px, -20px); 
    }
    to {
       transform: translate(initial, initial);
       font-size: 18px;
    }
`

export const slidToUpSolid = keyframes`
    from {
        transform: translate(0px, 0px); 
    }
    to {
       transform: translate(0px, -12px);
       font-size: 12px;
       padding-top: 5px;
       font-weight: bold;
    }
`

export const slidToDownSolid = keyframes`
    from {
        transform: translate(0px, -12px); 
    }
    to {
       transform: translate(initial, initial);
       font-size: 16px;
    }
`