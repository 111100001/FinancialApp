import React, { useEffect } from 'react'
import styled from 'styled-components'
import {useGlobalContext} from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';

function Income() {
  const {addIncome, incomes, getIncomes} = useGlobalContext()

  useEffect(() =>{
    getIncomes()
  }, [])
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <div className='income-content'>
          <div className='form-container'>
            <Form />
          </div>
          <div className='incomes'>
            {incomes.map((income) => {
              
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`

`;

export default Income