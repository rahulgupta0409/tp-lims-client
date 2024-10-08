import { ADD_MAJOR_LAB_TEST, SET_MAJOR_TESTS } from "../actions/actionTypes";

const initialState = {
    majorTests: {},
};

export default function majorTest(state = initialState, action) {
    switch (action.type) {
        case SET_MAJOR_TESTS: {
            return { ...state, majorTests: { ...action.payload } };
        }
        case ADD_MAJOR_LAB_TEST: {
            return { ...state, majorTests: { ...state.majorTests, ...action.payload } };
        }
        default:
            return state;
    }
};
