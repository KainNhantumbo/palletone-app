import styled from 'styled-components';

export const _docs = styled.main`
  margin-top: 50px;
  display: grid;
  align-items: center;
  justify-items: center;

  .wrapper-container {
    font-size: 1rem;
    line-height: 1.6rem;
    text-align: justify;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 1080px;
    padding: 50px;

    @media screen and (max-width: 520px) {
      padding: 40px 20px;
      text-align: left;
    }
    @media screen and (max-width: 370px) {
      padding: 30px 10px;
    }

    h2 {
      font-weight: 500;
      line-height: 2rem;
      margin-top: 5px;
      font-size: 1.4rem;
    }

    h3 {
      font-weight: 500;
      font-size: 1.2rem;
      padding-top: 10px;
    }

    h1 {
      font-size: 1.8rem;
      font-weight: 500;
    }

    p {
      padding: 5px 0;
    }

    ul,
    ol {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 12px;

      strong {
        margin-bottom: 5px;
      }
    }

    li {
      list-style: circle;
      list-style-position: inside;
    }

    strong {
      color: rgb(${({ theme }) => theme.primary_a});
    }

    a {
      color: rgb(${({ theme }) => theme.primary_c});
    }

    em {
      font-style: italic;
    }
  }
`;
