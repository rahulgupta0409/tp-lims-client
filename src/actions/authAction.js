import { requestHelper } from "../requestHelper"
import { API_URL, headers } from "../utils/constants"
import { setCookie } from "../utils/cookies";
import { LOGIN_SUCCESS } from "./actionTypes";

const setLoginSession = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

export const loginSuccessAsync = (data, callback) => {
    return (dispatch) => requestHelper.postRequest({
        url: `${API_URL}/auth/signin`,
        headers: new Headers(headers),
        body: JSON.stringify(data),
        onSuccess: (res) => {
            localStorage.setItem("tokenres.token", { expires: 1 });
            localStorage.setItem("loginSuccess", "true");
            setCookie("__rT", res.refreshToken, { expires: 7 });
            setCookie("user", res.user.fullName);
            dispatch(setLoginSession(res));
            callback && callback(res);
        }
    })
} 