import React from "react";
import styled from "styled-components";

const LoginContainerStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 30px 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
  border-radius: 10px;
  background: linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%);
  box-shadow: 0 0 5px 2px #cdc1ff;
  width: 90%;
  max-width: 400px;
`;

const LoginContainer = ({ children }) => {
  return <LoginContainerStyle>{children}</LoginContainerStyle>;
};

export default LoginContainer;
