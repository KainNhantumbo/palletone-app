import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const _error = styled.main`
  margin-top: 70px;
  display: grid;
  align-items: center;
  justify-items: center;
  line-height: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 50px;

  .content-container {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    h1 {
      font-weight: 600;
      font-size: 4.4rem;
      line-height: 2.8rem;
      color: rgb(${({ theme }) => theme.error});
    }

    h2 {
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      line-height: 2.8rem;
    }

    p {
      font-weight: 500;
      text-transform: uppercase;
      line-height: 1.8rem;
    }

    button {
      ${BaseButton}
      margin-top: 20px;
      font-weight: 500;
    }
  }

  .logo-container {
    span {
      font-size: 2.6rem;
      font-weight: 600;
      color: rgb(${({ theme }) => theme.font});
      font-family: 'Roboto', 'Helvetica Neue', 'Inter';
    }
  }
`;
