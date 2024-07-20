import firebase from 'firebase/compat/app';
import auth from '../../Firebase';
import { LOAD_PROFILE, LOG_OUT, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actionType';

export const login = () => async (dispatch) => {
    try {

        dispatch({
            type: LOGIN_REQUEST
        })

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');

        const response = await auth.signInWithPopup(provider);
        // console.log(response);

        const accessToken = response.credential.accessToken;
        const profile = {
            name: response.additionalUserInfo.profile.name,
            photoURL: response.additionalUserInfo.profile.picture
        };
        // console.log(profile);
        sessionStorage.setItem('YouTube Clone accessToken', accessToken);
        sessionStorage.setItem('YouTube Clone UserProfile', JSON.stringify(profile));

        dispatch({
            type: LOGIN_SUCCESS,
            payload: accessToken
        });

        dispatch({
            type: LOAD_PROFILE,
            payload: profile
        });

    } catch (error) {
        console.log('Login error:', error);

        dispatch({
            type: LOGIN_FAIL,
            payload: error
        });
    }
};

export const logOut = () => async (dispatch) => {
    await auth.signOut()
    dispatch({
        type: LOG_OUT
    })

    sessionStorage.removeItem('YouTube Clone accessToken');
    sessionStorage.removeItem('YouTube Clone UserProfile');
};