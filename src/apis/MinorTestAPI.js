import { getJwtToken } from "../utils/token";

export async function ADD_MINOR_LAB_TEST(
  testName,
  testPrice,
  minorTestUnit,
  remarks
) {
  let data;

  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      "http://localhost:8091/v1/minortest/addMinorTest",
      {
        method: "POST",
        body: JSON.stringify({
          testName,
          testPrice,
          minorTestUnit,
          remarks,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    data = await response.json();
  } catch (error) {
    console.error("Error during fetch:", error);
  }

  return data;
}

export async function GET_ALL_MINOR_LAB_TESTS() {
  let data;
  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      "http://localhost:8091/v1/minortest/getAllMinorTests",
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

export async function GET_ALL_MINOR_LAB_TEST_BY_ID(testId) {
  let data;
  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      `http://localhost:8091/v1/minortest/getMinorTestsByTestId?testId=${testId}`,
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

export async function UPDATE_MINOR_LAB_TEST_BY_ID(
  minorLabTestId,
  testName,
  testPrice,
  minorTestUnit,
  remarks
) {
  let data;

  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      "http://localhost:8091/v1/minortest/updateMinorLabTestById",
      {
        method: "POST",
        body: JSON.stringify({
          testName,
          testPrice,
          minorTestUnit,
          remarks,
        }),
        headers: {
          MinorLabTestId: minorLabTestId,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    data = await response.json();
  } catch (error) {
    console.error("Error during fetch:", error);
  }

  return data;
}

export async function DELETE_MINOR_LAB_TEST_BY_ID(testId) {
  let data;
  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      `http://localhost:8091/v1/minortest/deleteMinorLabTestBy/${testId}`,
      {
        method: "DELETE",
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
}
// console.log(
//   "fetttttttttttt",
//   getMinorTestById(
//     "0d38c253-0f0c-4904-b3c1-31914849e15fe-41db-46b8-bd96-fe8732f1c2b4"
//   )
// );
