// const token = localStorage.getItem("token");
// export const MinorTestAPI = {
//   getAllMinorTests: async function (cancel = false) {
//     const response = await fetch(
//       `http://localhost:8091/v1/minortest/getAllMinorTests`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log(response);
//     return response.json();
//   },
// };

// defining the cancel API object for ProductAPI
//const cancelApiObject = defineCancelApiObject(MionrTestAPI);
const token = localStorage.getItem("token");

export const MinorTestAPI = {
  getAllMinorTests: async function () {
    try {
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Request was cancelled");
      } else {
        console.error("Fetch error:", error);
      }
      throw error; // Re-throw error to be handled by the calling code if needed
    }
  },
};
