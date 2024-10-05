import React from "react";
import styled from "styled-components";

const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;
const Container = ({ children }) => {
  return <ContainerStyled>{children}</ContainerStyled>;
};

export default Container;
