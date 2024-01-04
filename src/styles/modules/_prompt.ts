import styled from 'styled-components';
import { BaseButton, BaseButtonOutline } from '../defaults';

export const _prompt = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 12000;
  background: rgba(${({ theme }) => theme.background}, 0.2);
  backdrop-filter: blur(2px);
  display: grid;
  place-content: center;
  user-select: none;
  line-height: 1.4rem;

  .dialog-prompt {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 12px;
    background: rgb(${({ theme }) => theme.foreground});
    max-width: 500px;
    margin: 25px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);

    .prompt-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;
      span {
        font-weight: 500;
        color: rgb(${({ theme }) => theme.primary_a});
      }
      p {
        line-height: 1.6rem;
        font-size: 0.9rem;
      }

      a {
        color: rgb(${({ theme }) => theme.primary_a});
      }
    }

    .prompt-actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: 10px;
      .prompt-cancel {
        ${BaseButtonOutline}
      }
      .prompt-accept {
        ${BaseButton}
      }
    }
  }
`;
