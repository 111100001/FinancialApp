import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import { MainLayout } from './styles/Layouts'; // Ensure this import path is correct
import { useGlobalContext } from './context/globalContext';


function App() {

  const global = useGlobalContext()
  console.log(global);
  


  return (
    <AppStyled>
      <Router>
        <Navigation />
        <MainLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
          </Routes>
        </MainLayout>
      </Router>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  display: flex;
  background-color: #f0f2f5; /* Example styling */
`;


export default App;