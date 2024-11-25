import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = " http://158.101.230.135/api/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-income`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

  

    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data)
        console.log(response.data)
    }

    // const deleteExpense = async (id) => {
    //     const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
    //     getExpenses()
    // }

    const deleteExpense = async (transaction_id) => {
        // if (!_id) {
        //   alert('Invalid transaction ID');
        //   return;
        // }
      
        try {
          const res = await axios.delete(`${BASE_URL}delete-expense/${transaction_id}`);
          console.log(res.data.message);
          getExpenses(); // Refresh the list of expenses
        } catch (error) {
          console.error('Error deleting expense:', error);
          alert('Error deleting expense');
        }
      };

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += parseFloat(income.amount); 
        });
        return totalIncome.toFixed(2); 
    }
    
    const totalExpenses = () => {
        let totalExpenses = 0;
        expenses.forEach((expense) => {
            totalExpenses += parseFloat(expense.amount); 
        });  
        return totalExpenses.toFixed(2); // Return the total as a string with 2 decimal places
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })

        return history.slice(0, 6)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}