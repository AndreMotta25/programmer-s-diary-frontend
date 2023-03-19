import React from 'react';
import { NavLink } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Avatar from './components/Avatar';
import Profile from './components/Profile'; 
import Security from './components/Security';
import * as S from './styles'

const Update = () => {  

  const styles: React.CSSProperties = {
    backgroundColor:'#282828',
    color: '#fff'
  }
  return (
    <>
    <S.ContainerBackground>
      <S.Container>
        <nav>
          <S.List>
            <S.ListItem>
              <NavLink style={({isActive}) => isActive ? styles : undefined} to="/" >Voltar</NavLink>
            </S.ListItem>
            <S.ListItem>
              <NavLink style={({isActive}) => isActive ? styles : undefined} to="" end>Perfil</NavLink>
            </S.ListItem>
            <S.ListItem>
              <NavLink style={({isActive}) => isActive ? styles : undefined} to="seguranca">Segurança</NavLink>
            </S.ListItem>
            <S.ListItem>
              <NavLink style={({isActive}) => isActive ? styles : undefined} to="avatar">Avatar</NavLink>
            </S.ListItem>
          </S.List>
        </nav>
        <Routes>
          <Route path='/' element={<Profile/>}/>
          <Route path='seguranca' element={<Security/>}/>
          <Route path='avatar' element={<Avatar/>}/>
        </Routes> 
      </S.Container>
    </S.ContainerBackground>
    </>
  )
}

export default Update