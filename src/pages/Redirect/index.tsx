import React, { ReactNode, useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import {useUserContext} from '../../hooks/useUserContext';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

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
  const {user,loading} = useUserContext();  

  return (
    <>
        {loading && <Container><Loading/></Container>}
        {!loading && !user && <Navigate to='/login'/>}
        {!loading && user && children}
    </>
  )
}

export default Redirect