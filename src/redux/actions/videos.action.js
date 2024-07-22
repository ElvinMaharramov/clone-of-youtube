import {

    CHANNEL_VIDEOS_FAIL,
    CHANNEL_VIDEOS_REQUEST,
    CHANNEL_VIDEOS_SUCCESS,

    HOME_VIDEOS_FAIL,
    HOME_VIDEOS_REQUEST,
    HOME_VIDEOS_SUCCESS,

    LIKED_VIDEOS_FAIL,
    LIKED_VIDEOS_REQUEST,
    LIKED_VIDEOS_SUCCESS,

    RELATED_VIDEOS_FAIL,
    RELATED_VIDEOS_REQUEST,
    RELATED_VIDEOS_SUCCESS,

    SEARCHED_VIDEOS_FAIL,
    SEARCHED_VIDEOS_REQUEST,
    SEARCHED_VIDEOS_SUCCESS,

    SELECTED_VIDEO_FAIL,
    SELECTED_VIDEO_REQUEST,
    SELECTED_VIDEO_SUCCESS,

    SUBSCRIPTIONS_CHANNEL_FAIL,
    SUBSCRIPTIONS_CHANNEL_REQUEST,
    SUBSCRIPTIONS_CHANNEL_SUCCESS

} from "../actionType";
import request from "../../api";


export const getPopularVideos = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOME_VIDEOS_REQUEST,
        });

        const { data } = await request('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'US',
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,
                // key: process.env.REACT_APP_YOUTUBE_API_KEY,
            }
        });

        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: 'All'
            },
        });
    }
    catch (error) {
        console.log(error.message);

        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message
        })
    }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOME_VIDEOS_REQUEST,
        });

        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,
                q: keyword,
                type: 'video'
                // key: process.env.REACT_APP_YOUTUBE_API_KEY,
            }
        });

        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: keyword
            },
        });
    }
    catch (error) {
        console.log(error.message);

        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message
        })
    }
};

export const getVideoById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: SELECTED_VIDEO_REQUEST,
        })

        const { data } = await request('/videos', {
            params: {
                part: 'snippet, statistics',
                id: id
            }
        });

        dispatch({
            type: SELECTED_VIDEO_SUCCESS,
            payload: data.items[0]
        })


    } catch (error) {
        console.log(error.message);
        dispatch({
            type: SELECTED_VIDEO_FAIL,
            payload: error.message
        })
    }
};

export const getRelatedVideos = (id) => async (dispatch) => {
    try {
        dispatch({
            type: RELATED_VIDEOS_REQUEST,
        })

        const { data } = await request('search', {
            params: {
                part: 'snippet',
                // relatedToVideoId: id,
                // videoCategoryId: id,
                maxResults: 15,
                type: 'video'
            }
        });

        dispatch({
            type: RELATED_VIDEOS_SUCCESS,
            payload: data.items
        })


    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: RELATED_VIDEOS_FAIL,
            payload: error.response.data.message
        })
    }
};

export const getVideosBySearch = (keyword) => async (dispatch) => {
    try {
        dispatch({
            type: SEARCHED_VIDEOS_REQUEST,
        });

        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                maxResults: 20,
                q: keyword,
                type: 'video, channel'
                // key: process.env.REACT_APP_YOUTUBE_API_KEY,
            }
        });

        dispatch({
            type: SEARCHED_VIDEOS_SUCCESS,
            payload: data.items
        });
    }
    catch (error) {
        console.log(error.message);

        dispatch({
            type: SEARCHED_VIDEOS_FAIL,
            payload: error.message
        })
    }
};

export const getSubscribedChannels = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: SUBSCRIPTIONS_CHANNEL_REQUEST
        });

        const { data } = await request('/subscriptions', {
            params: {
                part: 'snippet, contentDetails',
                mine: true,
            },

            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },

        });

        dispatch({
            type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
            payload: data.items
        })
        console.log(data);


    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: SUBSCRIPTIONS_CHANNEL_FAIL,
            payload: error.response.data
        })
    }
};

// export const getVideosByChannel = (id) => async (dispatch) => {
//     try {

//         dispatch({
//             type: CHANNEL_VIDEOS_REQUEST,
//         });

//         const { data: { items } } = await request('/channels', {
//             params: {
//                 part: 'contentDetails',
//                 id: id,
//             },
//         });

//         const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;

//         const { data } = await request('/playlistItems', {
//             params: {
//                 part: 'contentDetails, snippet',
//                 playlistId: id,
//                 maxResults:30,
//             },
//         });

//         console.log(items);

//         dispatch({
//             type: CHANNEL_VIDEOS_SUCCESS,
//             payload: data.items
//         })
//         console.log(items);


//     } catch (error) {
//         console.log(error.response.data.message);
//         dispatch({
//             type: CHANNEL_VIDEOS_FAIL,
//             payload: error.response.data
//         })
//     }
// }

export const getVideosByChannel = (id) => async (dispatch) => {
    try {
        dispatch({
            type: CHANNEL_VIDEOS_REQUEST,
        });

        const response = await request('/channels', {
            params: {
                part: 'contentDetails',
                id: id,
            },
        });

        if (!response || !response.data) {
            throw new Error('Invalid response structure');
        }

        const { items } = response.data;

        if (items.length === 0) {
            throw new Error('No items found in response');
        }

        const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;

        const playlistResponse = await request('/playlistItems', {
            params: {
                part: 'snippet,contentDetails',
                playlistId: uploadPlaylistId,
                maxResults: 20,
            },
        });

        if (!playlistResponse || !playlistResponse.data) {
            throw new Error('Invalid playlist response structure');
        }

        console.log(playlistResponse.data.items);

        dispatch({
            type: CHANNEL_VIDEOS_SUCCESS,
            payload: playlistResponse.data.items,
        });

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        dispatch({
            type: CHANNEL_VIDEOS_FAIL,
            payload: error.response ? error.response.data : error.message,
        });
    }
};

export const getLikedVideos = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIKED_VIDEOS_REQUEST,
        });

        const { data } = await request('/videos', {
            params: {
                part: 'snippet, contentDetails, statistics',
                myRating: 'like',
                maxResults: 20,
                // pageToken: getState().likedVideos.nextPageToken,
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        });
        console.log(data);

        dispatch({
            type: LIKED_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
            },
        });
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: LIKED_VIDEOS_FAIL,
            payload: error.message,
        });
    }
};