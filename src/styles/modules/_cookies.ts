import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const _cookies = styled.div`
  width: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 12000;

  div {
    position: absolute;
    left: 20px;
    bottom: 20px;
    border-radius: 12px;
    padding: 20px;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    line-height: 1.4rem;
    font-size: 0.9rem;
    backdrop-filter: blur(10px);
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);

    ::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 1px;
      left: calc(50% - 10px);
      bottom: 30px;
      border-radius: 50%;
      z-index: -999;
      transform: rotate(180);
      backdrop-filter: blur(10px);
      box-shadow: 0 0 100px 60px rgba(${({ theme }) => theme.primary_a}, 0.8);
    }

    @media screen and (max-width: 435px) {
      flex-direction: column;
    }
    strong {
      color: rgb(${({ theme }) => theme.primary_c});
      cursor: pointer;
    }

    button {
      ${BaseButton}
    }
  }
`;
