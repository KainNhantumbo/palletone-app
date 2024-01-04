import { css } from 'styled-components';

export const BaseButtonOutline = css`
  border: none;
  background: none;
  padding: 7px 10px;
  color: rgb(${({ theme }) => theme.font});
  width: fit-content;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  :hover {
    color: rgb(${({ theme }) => theme.primary_a});
  }
  span {
    font-weight: 500;
    pointer-events: none;
  }
`;

export const BaseButton = css`
  all: unset;
  border-radius: 8px;
  padding: 7px 10px;
  width: fit-content;
  cursor: pointer;
  background: rgba(${({ theme }) => theme.primary_a}, 0.5);
  color: rgb(${({ theme }) => theme.font});
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
  text-align: center;

  :hover {
    background: rgba(${({ theme }) => theme.primary_a}, 0.9);
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.3);
  }
  :disabled {
    box-shadow: none;
    background: rgba(${({ theme }) => theme.primary_a}, 0.4);
    span {
      color: rgb(${({ theme }) => theme.foreground});
    }
  }
  span {
    font-weight: 500;
    pointer-events: none;
  }
`;

export const StyledCornerButton = css`
  all: unset;
  border-radius: 10px;
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.black}, 0.07);
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;
  padding: 5px;

  :hover {
    color: rgb(${({ theme }) => theme.primary_a});
  }

  svg {
    pointer-events: none;
    width: 20px;
    height: 20px;
  }
`;

export const StyledLabels = css`
  position: relative;
  line-height: 1.4rem;

  svg {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 2px;
    left: 0;
    color: rgb(${({ theme }) => theme.font});
  }
  span {
    padding-left: 25px;
    font-weight: 500;
  }
`;

export const StyledInputs = css`
  input,
  textarea,
  select {
    width: 100%;
    height: fit-content;
    border: none;
    padding: 10px 18px;
    line-height: 1.2rem;
    font-weight: 400;
    outline: none;
    border-radius: 8px;
    background: rgba(${({ theme }) => theme.background}, 0.7);
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    color: rgb(${({ theme }) => theme.font});
    :focus {
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
      box-shadow: 0 0 20px rgba(${({ theme }) => theme.black}, 0.06);
    }
    ::placeholder {
      color: rgba(${({ theme }) => theme.font}, 0.8);
      font-size: 0.9rem;
    }
    :disabled {
      background: rgb(${({ theme }) => theme.foreground});
      border: none;
      ::placeholder {
        color: transparent;
      }
    }
  }

  textarea {
    resize: vertical;
  }
`;
