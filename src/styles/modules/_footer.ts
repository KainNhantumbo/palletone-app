import styled from 'styled-components';

export const _footer = styled.footer`
  width: 100%;
  max-width: 800px;
  font-weight: 500;
  font-size: 1rem;
  z-index: 12000;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
  justify-content: space-between;

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background});
      color: rgb(${({ theme }) => theme.primary_a});
    }
  }

  nav {
    width: fit-content;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 20px;
  }

  a,
  p {
    font-size: 0.9rem;
    span {
      line-height: 1rem;
      :hover {
        cursor: pointer;
        color: rgb(${({ theme }) => theme.primary_a});
      }
    }
  }
`;
