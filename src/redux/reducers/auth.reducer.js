import {
    LOAD_PROFILE,
    LOG_OUT,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS
} from "../actionType";

const initialState = {

    accessToken: sessionStorage.getItem('YouTube Clone accessToken')
        ? sessionStorage.getItem('YouTube Clone accessToken')
        : null,
    user: sessionStorage.getItem('YouTube Clone UserProfile')
        ? JSON.parse(sessionStorage.getItem('YouTube Clone UserProfile'))
        : null,
    loading: false

};

export const authReducer = (prevState = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...prevState,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...prevState,
                accessToken: payload,
                loading: false
            }

        case LOGIN_FAIL:
            return {
                ...prevState,
                accessToken: null,
                loading: false,
                error: payload
            }

        case LOAD_PROFILE:
            return {
                ...prevState,
                user: payload
            }

        case LOG_OUT:
            return {
                ...prevState,
                accessToken: null,
                user: null
            }

        default:
            return prevState
    }
};