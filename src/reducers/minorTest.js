import { ADD_MINOR_LAB_TEST, SET_MINOR_TESTS } from "../actions/actionTypes";

const initialState = {
    minorTests: {},
};

export default function minorTest(state = initialState, action) {
    switch (action.type) {
        case SET_MINOR_TESTS: {
            return { ...state, minorTests: { ...action.payload } };
        }
        case ADD_MINOR_LAB_TEST: {
            return { ...state, minorTests: { ...state.minorTests, ...action.payload } };
        }
        default:
            return state;
    }
};
