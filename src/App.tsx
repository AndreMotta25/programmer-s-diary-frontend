import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ToastFy from './components/Toastfy';
import UserProvider from './context/User';
import ConfirmEmail from './pages/ConfirmEmail';
import ForgetPassword from './pages/ForgetPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Redirect from './pages/Redirect';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Update from './pages/Update';
import GlobalStyle from './styles/globalStyles';
import theme from "./styles/theme"

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route path='/' element={<Redirect><Home/></Redirect>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/usuario/editar/*' element={<Redirect><Update/></Redirect>}/>
              <Route path='/registrar' element={<Register/>}/>
              <Route path='/confirmar-email/:token' element={<ConfirmEmail/>}/>
              <Route path='/recuperar-senha' element={<ForgetPassword/>}/>
              <Route path='/reset-senha/:token' element={<ResetPassword/>}/>
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
      <ToastFy/>
    </>
  );
}


export default App