import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Login from './pages/Login';
import GlobalStyle from './styles/globalStyles';
import theme from "./styles/theme"

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
