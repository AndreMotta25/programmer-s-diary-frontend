import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ToastFy from './components/Toastfy';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Update from './pages/Update';
import GlobalStyle from './styles/globalStyles';
import theme from "./styles/theme"

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/usuario/editar/*' element={<Update/>}/>
            <Route path='/registrar' element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ToastFy/>
    </>
  );
}

export default App;
