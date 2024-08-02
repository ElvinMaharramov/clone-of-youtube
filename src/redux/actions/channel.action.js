import request from "../../api";
import {
    CHANNEL_DETAILS_FAIL,
    CHANNEL_DETAILS_REQUEST,
    CHANNEL_DETAILS_SUCCESS,
    CHANNEL_SUBSCRIPTION_STATUS,
} from "../actionType";

// Kanalın məlumatlarını əldə etmək üçün istifadə olunan funksiya.
export const getChannelDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            //Dipatch Redux metodudur, actionları göndərir.
            type: CHANNEL_DETAILS_REQUEST,
        })

        const { data } = await request('/channels', {
            params: {//API üçün göndərilən parametrlər.
                part: 'snippet, statistics, contentDetails',
                id,
            }
        });

        dispatch({
            type: CHANNEL_DETAILS_SUCCESS,
            payload: data.items[0]
        })


    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: CHANNEL_DETAILS_FAIL,
            payload: error.response.data
        })
    }
}

// Kanal abunəliyinin statusunu yoxlamaq üçün funksiya.
export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
    try {

        const { data } = await request('/subscriptions', {
            params: {
                part: 'snippet',
                forChannelId: id,
                mine: true,
            },

            headers: {//API çağrısına əlavə olunan başlıqlar, istifadəçinin girişi üçün accessToken istifadə edir.
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },

        });

        dispatch({
            type: CHANNEL_SUBSCRIPTION_STATUS,
            payload: data.items.length !== 0    
        })
        console.log(data);


    } catch (error) {
        console.log(error.response.data);
    }
}