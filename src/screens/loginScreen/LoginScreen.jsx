import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../redux/actions/auth.action';

import YouTubeLogo from '../../assets/img/YouTube logo.png';
import './loginScreen.scss';

const LoginScreen = () => {

    const dispatch = useDispatch();

    const accessToken = useSelector(state => state.auth.accessToken);
    console.log("AccessToken:", accessToken);

    const handleLogin = () => {
        dispatch(login());
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (accessToken) {
            navigate('/')
        }
    }, [accessToken, navigate]);

    return (
        <div className="login">
            <div className="container">
                <img
                    src={YouTubeLogo}
                    alt="YouTube Logo"
                    className='login-YouTube-logo'
                />
                <button
                    onClick={handleLogin}
                ><span>Sign in with Google</span>
                </button>
                <p className='author'>This project is made using YouTube Data API by Elvin Maharramov</p>
            </div>
        </div>
    )
}

export default LoginScreen;