import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: white;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  div.header {
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: #7159c1;
    font-size: 16px;
  }

  img {
    width: 90px;
    border-radius: 50%;
    margin-top: 20px;
    margin-right: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: justify;
    max-width: 400px;
  }
`;

export const IssuesList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-top: 10px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 3px;
        font-size: 12px;
        height: 20px;
        line-height: 15px;
        padding: 2px 4px;
        margin-right: 10px;
      }

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }
    }

    p {
      display: flex;
      align-items: center;
      margin-top: 8px;
      font-weight: normal;
      color: #320;
    }
  }
`;

export const Filter = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  div.buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  select {
    border: none;
    border-radius: 3px;
    background: #eee;
    font-size: 15px;
  }

  select option {
    border: none;
    background: #fff;
    font-size: 15px;
  }
`;

export const Button = styled.button`
  margin: 0 10px;
  margin-bottom: 5px;
  padding: 2px 2px;
  width: 150px;
  border: 2px solid #7159c1;
  border-radius: 4px;
  font-size: 14px;

  color: ${(props) => (props.selected ? '#fff' : '#333')};
  background: ${(props) => (props.selected ? '#7159c1' : '#fff')};
`;

export const NavigatorButton = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-top: 10px;

  p {
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }

  button {
    border: none;
    background: none;
    padding: 0;

    &[disabled] {
      opacity: 0.3;
    }
  }

  button svg {
    width: 30px;
    height: 30px;
    color: #7159c1;
    pointer-events: none;
  }
`;
