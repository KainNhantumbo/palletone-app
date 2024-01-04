import styled from 'styled-components';
import { BaseButton, BaseButtonOutline, StyledCornerButton } from '../defaults';

export const _toast = styled.section`
  position: fixed;
  z-index: 30000;
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  right: 0;

  .dialog-prompt {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 12px 20px;
    border-radius: 12px;
    background: rgb(${({ theme }) => theme.foreground});
    max-width: 500px;
    font-size: 0.9rem;
    margin: 20px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);
    position: relative;

    @media screen and (max-width: 430px) {
      gap: 5px;
    }

    .box-btn_close {
      ${StyledCornerButton}
      position: absolute;
      top: 5px;
      right: 5px;
      border: none;
      :hover {
        color: rgb(${({ theme }) => theme.error});
        background: rgb(${({ theme }) => theme.primary_c}, 0.2);
      }
    }

    .prompt-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;

      .prompt-title {
        font-weight: 600;
        line-height: 1.6rem;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: rgb(${({ theme }) => theme.error});
      }
      .prompt-message {
        line-height: 1.4rem;
        font-size: 0.92rem;
      }
    }

    .prompt-actions {
      display: flex;
      flex-direction: row;
      gap: 12px;

      .prompt-cancel {
        ${BaseButtonOutline}
      }

      .prompt-accept {
        ${BaseButton}
      }
    }
  }
`;
