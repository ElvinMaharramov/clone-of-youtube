import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { authReducer } from './reducers/auth.reducer';
import { channelVideosReducer, homeVideosReducer, relatedVideosReducer, searchedVideosReducer, subscriptionsChannelReducer } from './reducers/videos.reducers';
import { selectedVideoReducer } from './reducers/videos.reducers';
import { channelDetailsReducer } from './reducers/channel.reducer';
import { commentListReducer } from './reducers/comments.reducer';
import { likedVideosReducer } from './reducers/videos.reducers';

// const initialState = {
//     name: 'Elvin',
//     age: '25'
// };



// const reducer = (initialState) => (initialState);
const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideosReducer,
    selectedVideo: selectedVideoReducer,
    channelDetails: channelDetailsReducer,
    commentList: commentListReducer,
    relatedVideos: relatedVideosReducer,
    searchedVideos: searchedVideosReducer,
    subscriptionsChannel: subscriptionsChannelReducer,
    channelVideos: channelVideosReducer,
    likedVideos: likedVideosReducer,
})

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;