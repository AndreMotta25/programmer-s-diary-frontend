import React, { ReactNode, useEffect } from 'react'
import Loading from '../../components/Loading';
import {useUserContext} from '../../hooks/useUserContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface IProps {
    children: ReactNode
}

export const Container = styled.div`
  background-color:#282828;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Redirect = ({children}:IProps) => {
  const {user, loading} = useUserContext();  
  const navigate = useNavigate();

  useEffect(() => {
    if(!loading && !user){
      navigate('/login');
    }
      
  },[loading])
  
  return (
    <>

        {loading && <Container><Loading/></Container>}
        <div>{!loading && user && children}</div>
        {/* <div>{!loading && !user && <p>Faça login para ver essa pagina</p>}</div> */}
    </>
  )
}

export default Redirect