import React, { useState } from "react";

const setJwtToken = (token, refreshToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

const refreshTokenCookies = () => {};
const refreshToken = () => {};
