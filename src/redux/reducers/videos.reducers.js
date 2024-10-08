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

export const homeVideosReducer = (state = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: 'All'
}, action) => {
    const { type, payload } = action;

    switch (type) {
        case HOME_VIDEOS_SUCCESS: return {
            ...state,
            videos:
                state.activeCategory === payload.category
                    ? [...state.videos, ...payload.videos]
                    : payload.videos,
            loading: false,
            nextPageToken: payload.nextPageToken,
            activeCategory: payload.category
        }

        case HOME_VIDEOS_FAIL: return {
            ...state,
            loading: false,
            error: payload
        }

        case HOME_VIDEOS_REQUEST: return {
            ...state,
            loading: true,
        }

        default:
            return state;
    }

};

export const selectedVideoReducer = (state = {
    loading: true,
    video: null
}, action) => {

    const { payload, type } = action;

    switch (type) {

        case SELECTED_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SELECTED_VIDEO_SUCCESS:
            return {
                ...state,
                video: payload,
                loading: false
            }

        case SELECTED_VIDEO_FAIL:
            return {
                ...state,
                video: null,
                loading: false,
                error: payload
            }


        default:
            return state;
    }
}

export const relatedVideosReducer = (state = {
    loading: true,
    videos: []
}, action) => {

    const { payload, type } = action;

    switch (type) {

        case RELATED_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case RELATED_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false
            }

        case RELATED_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }


        default:
            return state;
    }
}

export const searchedVideosReducer = (state = {
    loading: true,
    videos: []
}, action) => {

    const { payload, type } = action;

    switch (type) {

        case SEARCHED_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SEARCHED_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false
            }

        case SEARCHED_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }


        default:
            return state;
    }
}

export const subscriptionsChannelReducer = (state = {
    loading: true,
    videos: []
}, action) => {

    const { payload, type } = action;

    switch (type) {

        case SUBSCRIPTIONS_CHANNEL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SUBSCRIPTIONS_CHANNEL_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false
            }

        case SUBSCRIPTIONS_CHANNEL_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }


        default:
            return state;
    }
};

export const channelVideosReducer = (state = {
    loading: true,
    videos: []
}, action) => {

    const { payload, type } = action;

    switch (type) {

        case CHANNEL_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CHANNEL_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false
            }

        case CHANNEL_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }


        default:
            return state;
    }
};

export const likedVideosReducer = (state = {
    loading: true,
    videos: [],
}, action) => {
    
    const { type, payload } = action;

    switch (type) {
        case LIKED_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LIKED_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: [...state.videos, ...payload.videos],
                loading: false,
                nextPageToken: payload.nextPageToken,
            };
        case LIKED_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};