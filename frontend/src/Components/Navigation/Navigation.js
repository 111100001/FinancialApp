import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Navigation() {
  return (
    <NavStyled>
      <h2>Income Tracker</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/income">Incomes</Link>
        </li>
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px; /* Adjust as needed */
  background-color: #f8f9fa; /* Sidebar color */
  padding: 2rem;
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
      }
    }
  }
`;

export default Navigation;
