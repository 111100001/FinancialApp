import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { signout } from '../../utils/Icons'
import logo from '../../utils/logo.png'; 

function Navigation() {
  return (
    <NavStyled>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Financy</h2>
        
      </div>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/income">Incomes</Link>
        </li>
        <li>
          <Link to="/expense">Expenses</Link>
        </li>
      </ul>
      <div className="bottom-nav">
                <li>
                    
                    <a href="http://158.101.230.135"> {signout} Sign Out </a>
                </li>
            </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh; 
  width: 250px; 
  background-color: #f8f9fa; 
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .logo-container {
    text-align: center;
    margin-bottom: 20px;
  }
  .logo {
    width: 100px; 
    height: auto;
    margin-bottom: 10px;
  }
  .user-name {
    font-size: 1rem;
    color: #666;
    margin-top: 5px;
  }

  

  .user-info {
    text-align: center; 
    margin-bottom: 2rem;
  }
  ul {
    list-style: none; 
    padding: 0;
    li { 
      margin: 1rem 0; 
      
      a {
        text-decoration: none;
        color: #000;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        gap: 10px;
        &:hover {
          color: var(--color-accent);
        }
        font-family: 'Merriweatherlight';
        
      }
    }
  }
  h2{
    font-size: 3rem;
  }
`;

export default Navigation;
