import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const _home = styled.main`
  position: relative;
  width: 100%;
  position: relative;

  .wrapper-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    justify-items: center;
    max-width: 980px;
    align-self: center;
    margin: 0 auto;
    padding-top: 60px;
  }

  article {
    width: 100%;
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;
