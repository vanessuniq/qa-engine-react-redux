import { getProfileConfig, postConfig } from "../helpers/configOptions";
import { error, success } from "../helpers/notifications";

const DOMAIN = "https://united-web-dev-api.herokuapp.com"

const authFailed = error => ({
    type: 'AUTH_FAILED',
    payload: error
})
const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

export const register = (user) => {
    return async dispatch => {
        try {
            dispatch({ type: 'CREATING_OR_GETTING_USER' })
            const data = await fetch(`${DOMAIN}/api/v1/users`, postConfig(user)).then(resp => resp.json())
            if (data.errors) {
                dispatch(authFailed(data.errors))
            } else {
                localStorage.setItem('token', data.jwt)
                dispatch(loginUser(data.user))
                success(`Welcome ${data.user.username}, your account has been created!`)

            };
        } catch (e) {
            error(e)
            throw e
        }
    };
};

export const login = (user) => {
    return async dispatch => {
        try {
            dispatch({ type: 'CREATING_OR_GETTING_USER' })
            const data = await fetch(`${DOMAIN}/api/v1/login`, postConfig(user)).then(resp => resp.json())
            if (data.failure) {
                dispatch(authFailed(data.failure))
            } else {
                localStorage.setItem('token', data.jwt)
                dispatch(loginUser(data.user))
                success(`Welcome back ${data.user.username}`)
            };
        } catch (e) {
            error(e)
            throw e
        }
    };
};

export const logoutUser = () => {
    return { type: 'LOGOUT_USER' };
}

export const getProfile = () => {
    return async dispatch => {
        try {

            const token = localStorage.token;
            if (token) {
                const data = await fetch(`${DOMAIN}/api/v1/auto_login`, getProfileConfig(token))
                    .then(resp => resp.json());
                if (data.message) {
                    localStorage.removeItem('token')

                } else {
                    dispatch(loginUser(data.user))
                };

            }
        } catch (e) {
            error(e)
            throw e
        }
    };
};
const fetchUsersFulfilled = (users) => ({
    type: 'FETCH_USERS_FULFILLED',
    payload: users
})

export const fetchAllUsers = () => {
    return async dispatch => {
        try {
            const data = await fetch(`${DOMAIN}/api/v1/users`).then(resp => resp.json())
            dispatch(fetchUsersFulfilled(data))
        } catch (e) {
            dispatch(authFailed(e))
            throw e
        }
    };
};