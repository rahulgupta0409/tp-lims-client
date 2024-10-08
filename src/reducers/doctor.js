import { SET_ALL_DOCTORS } from "../actions/actionTypes";

const initialState = {
    doctors: {},
};

export default function doctors(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_DOCTORS: {
            return { ...state, doctors: { ...action.payload } };
        }
        default:
            return state;
    }
};
