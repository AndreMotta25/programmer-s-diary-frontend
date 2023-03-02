import styled from 'styled-components';

export const Container = styled.section`
    background-color: #282828;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    p + div {
        margin-bottom: 3%;
    }
`
export const Box = styled.div`
    background: linear-gradient(to right, #e981d9, #6d22c4);
    padding: 2rem;
    border-radius: ${({theme}) => theme.border};
    min-width: 25%;
`;