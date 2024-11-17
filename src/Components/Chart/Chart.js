import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const {incomes} = useGlobalContext()

    const data = {
        labels: incomes.map((inc) => {
            const {date} = inc
            return dateFormat(date)
        }),

        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ], 
                backgroundColor: 'green'
            }, 
            {
                label: 'Expenses',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ], 
                backgroundColor: 'red'
            } 
        ]
    }
    // Add the options object
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white', // Change legend font color to white
                },
            },
            tooltip: {
                bodyColor: 'white', // Tooltip text color
                titleColor: 'white', // Tooltip title color
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white', // X-axis font color
                },
            },
            y: {
                ticks: {
                    color: 'white', // Y-axis font color
                },
            },
        },
    };

    return (
        <ChartStyled>
            <Line data={data} options={options} /> {/* Pass options here */}
        </ChartStyled>
    );
}


const ChartStyled = styled.div`
    background: #3b4a6e;
    border: 2px solid #222836;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`

export default Chart