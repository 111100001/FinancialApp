import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root {
        --primary-color: #222260;
        --primary-color2: 'color: rgba(34, 34, 96, .6)';
        --primary-color3: 'color: rgba(34, 34, 96, .4)';
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
        --color-red: #FF0000;
        --color-blue: #0000FF; // Reverted to original color
    }

     body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: 'Merriweather', serif;
        font-size: 1.2rem;
        background-color: #f0f2f5; 
        color: rgba(34, 34, 96, 0.6);
        
    }

    #root {
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--primary-color);
    }

    .error {
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(10px); }
            50% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
            100% { transform: translateX(0); }
        }
    }
`;
