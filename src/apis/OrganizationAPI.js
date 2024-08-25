import { getJwtToken } from "../utils/token";

export async function GET_ALL_ORGANIZATIONS() {
  let data;
  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      "http://localhost:8091/v1/organization/getAllOrganizations",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    data = await response.json();
  } catch (error) {}

  return data;
}
