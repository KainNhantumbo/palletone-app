import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {    
    scroll-padding-top: 90px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    max-width: 100%;
    background: rgb(${({ theme }) => theme.background});

    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_a});
    }
  }
  
  label {
    user-select: none;
  }
  
  body {
    width: 100%;
    position: relative;
    color: rgb(${({ theme }) => theme.font});
    background: rgb(${({ theme }) => theme.background});
    font-family: Inter, Roboto, 'Open Sans','Helvetica Neue', -apple-system, sans-serif;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 5px;
    background: rgba(${({ theme }) => theme.background}, 0.3);

    :hover {
      transition: all 0.2s ease-in-out;
    }
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: rgb(${({ theme }) => theme.font});

    :hover {
      transition: all 0.2s ease-in-out;
    }
  }
  
  ::-webkit-scrollbar-thumb::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%; 
    min-width: 44px;
    min-height: 44px;
  }

  .tooltip-class {
    border-radius: 8px;
    color: rgb(${({ theme }) => theme.white});
    background: rgba(${({ theme }) => theme.primary_a}, 0.8);
    border: 1px solid rgba(${({ theme }) => theme.white}, 0.9);
    backdrop-filter: blur(20px);
    font-family: 'Inter';
    padding: 5px 10px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .tooltip-border-class {
    border-right: 1px solid rgba(${({ theme }) => theme.white}, 0.9);
    border-bottom: 1px solid rgba(${({ theme }) => theme.white}, 0.9);
  }

`;
