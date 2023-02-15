import styled from 'styled-components';
import { ContainerBackground as Background, ContainerLogin, Header as HeaderLogin, 
         Img as ImgLogin,
         Title as TitleLogin, Cadastrar as RegisterLogin} from '../Login/styles';

export const ContainerBackground = styled(Background)`

`;

export const ContainerRegister = styled(ContainerLogin)`
`
export const Container = styled.div`
    width: 51.601423487544%;
`

// *
export const Header = styled(HeaderLogin)``;

// *

export const Img = styled(ImgLogin)`
`;

// * 
export const Title = styled(TitleLogin)`
`;

export const GoToLoginPage = styled(RegisterLogin)`
    & > * {
        display: block;
    }
`

export const Result = styled.p`
    font-family: 'Source Code Pro', monospace;
    text-align: center;
    margin-bottom: 2rem;
`