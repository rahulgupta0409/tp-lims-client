import { getCookie, setCookie } from "./cookies";

export function getJwtToken() {
  let token = localStorage.getItem("token");
  console.log(token);
  let refreshToken = "";

  if (token == null) {
    let refreshToken = getCookie("refreshToken");
    console.log(refreshToken);
    try {
      const response = fetch("http://localhost:8091/v1/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.json();

      if (data?.token) {
        localStorage.setItem("token", data.token);
        token = data.token;
      } else {
        console.error("Refresh failed: No token received");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  }
  return token;
}
