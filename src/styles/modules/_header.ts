import styled from 'styled-components';
import { BaseButton, StyledCornerButton } from '../defaults';

export const _header = styled.header`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  background:transparent;
  padding: 12px 8px;
  font-weight: 500;
  font-size: 0.9rem;
  z-index: 20000;

  .wrapper {
    margin: 0 auto;
    @media screen and (min-width: 1200px) {
      max-width: 1200px;
      left: calc(50% - 600px);

      .logo {
        left: calc(50% - 600px);
      }
    }
  }

  .logo {
    position: absolute;
    top: calc(50% - 14px);
    left: 30px;
    cursor: pointer;
    margin-right: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    user-select: none;
    a {
      position: relative;
    }

    img {
      width: 100%;
      max-width: 20px;
      object-fit: cover;
    }

    @media screen and (max-width: 600px) {
      left: 30px;
    }
  }

  nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    top: -8px;
    left: 180px;
    gap: 20px;
    font-size: 0.9rem;

    .active {
      color: rgb(${({ theme }) => theme.primary_a});
    }

    .navigation-anchors-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      @media screen and (max-width: 600px) {
        gap: 10px;
      }

      span {
        padding: 5px;
        :hover {
          cursor: pointer;
          color: rgb(${({ theme }) => theme.primary_a});
        }
      }
    }

    @media screen and (max-width: 990px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      position: relative;
      left: 180px;
      width: 100%;
      gap: 20px;

      .navigation-anchors-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        @media screen and (max-width: 600px) {
          gap: 10px;
        }

        span {
          padding: 5px;
          :hover {
            cursor: pointer;
            color: rgb(${({ theme }) => theme.primary_a});
          }
        }
      }
    }

    @media screen and (max-width: 770px) {
      position: absolute;
      top: 0px;
      left: 0;
      height: auto;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      margin-top: 50px;
      background: rgba(${({ theme }) => theme.foreground}, 0.95);
      backdrop-filter: blur(30px);
      padding: 20px;

      .navigation-anchors-container {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        gap: 18px;
        margin-left: 20px;

        span {
          padding: 5px 8px;
          width: max-content;
          border-radius: 5px;

          :hover {
            cursor: pointer;
            background-color: rgb(${({ theme }) => theme.primary_a});
            color: rgb(${({ theme }) => theme.white});
            transition: all 200ms ease-in-out;
          }
        }
        button {
          ${BaseButton}
          background: rgb(${({ theme }) => theme.primary_b});
        }
      }
    }
  }

  .left-corner-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 0.9rem;
    justify-self: flex-end;
    position: relative;
    left: -190px;

    .login-btn,
    .sign-in-btn {
      border: none;
      background: none;
      position: relative;
      padding: 13px;
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
    }

    .sign-in-btn {
      span {
        position: relative;
        top: calc(50% - 7px);
        padding: 0;
        padding-right: 25px;
      }
      svg {
        width: 20px;
        height: 20px;
        position: absolute;
        top: calc(50% - 10px);
        right: 7px;
        pointer-events: none;
      }
    }

    .user-account {
      border: none;
      background: none;
      padding: 10px;
      color: rgb(${({ theme }) => theme.font});
      width: fit-content;
      cursor: pointer;
      white-space: nowrap;
      outline: none;
      overflow: visible;
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
      :hover {
        color: rgb(${({ theme }) => theme.primary_a});
      }

      img {
        object-fit: cover;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        position: absolute;
        top: calc(50% - 14px);
        right: -6px;
        pointer-events: none;
      }

      svg {
        width: 22px;
        height: 22px;
      }
    }

    @media screen and (max-width: 770px) {
      left: 0;
    }
  }

  .toggle-btn {
    ${StyledCornerButton}
    position: fixed;
    top: 9px;
    right: 20px;
    border: none;

    @media screen and (min-width: 770px) {
      display: none;
    }
  }

  .toggle-btn_active {
    background-color: rgba(${({ theme }) => theme.primary_a}, 0.1);
  }
`;
