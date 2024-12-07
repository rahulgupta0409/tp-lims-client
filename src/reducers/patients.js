import {
  SET_ALL_PATIENTS,
  SET_PATIENT_TEST_DETAIL,
} from "../actions/actionTypes";

const initialState = {
  patients: [],
};

export default function patients(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PATIENTS: {
      return { ...state, patients: [...action.payload] };
    }
    case SET_PATIENT_TEST_DETAIL: {
      const { patientId, testId, value } = action.payload;
      console.log("value", value);
      return {
        ...state,
        patients: state.patients.map((patient) => {
          if (patient.patientId === patientId) {
            return {
              ...patient,
              tests: patient.tests.map((test) => {
                return test.isMajorLabTest
                  ? {
                      ...test,
                      minorLabTestList: test.minorLabTestList.map(
                        (mTest) =>
                          mTest.testId === testId
                            ? { ...mTest, value: value } // Update value if testId matches
                            : { ...mTest } // Return new object even if unchanged
                      ),
                    }
                  : test.testId === testId
                  ? { ...test, value: value } // Update test value if testId matches
                  : { ...test }; // Return new object for other tests
              }),
            };
          }
          return { ...patient }; // Return new object for other patients
        }),
      };
    }
    default:
      return state;
  }
}
