import React from 'react'
import styled from 'styled-components';

function History() {
    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            <div className='history-item'>
                <p style={{color:'red'}}>
                    Recent Expense
                </p>                
            </div>            
            <div className='history-item'>
                <p style={{color: 'var(--color-green)'}}>
                    Recent Income
                </p>                
            </div>
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #3b4a6e;
        border: 2px solid #222836;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History