import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './videoMetaData.scss';

import { MdThumbUp, MdThumbDown } from 'react-icons/md';

import moment from 'moment/moment';
import numeral from 'numeral';

import ShowMoreText from 'react-show-more-text';
// import ReactShowMoreText from 'react-show-more-text';
import { checkSubscriptionStatus, getChannelDetails } from '../../redux/actions/channel.action';


const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {

    const { channelId, channelTitle, description, title, publishedAt } = snippet;
    const { viewCount, likeCount, dislikeCount } = statistics;

    const dispatch = useDispatch();

    const {
        snippet: channelSnippet,
        statistics: channelStatistics
    } = useSelector(state => state.channelDetails.channel);

    const subscriptionStatus = useSelector(
        state => state.channelDetails.subscriptionStatus
    );

    useEffect(() => {
        dispatch(getChannelDetails(channelId))
        dispatch(checkSubscriptionStatus(channelId))
    }, [dispatch, channelId]);

    return (
        <div className="video-meta-data py-2">
            <div className="video-meta-data-top">
                <h5>{title}</h5>
                <div className="d-flex justify-content-between align-items-center py-1">
                    <span>
                        {numeral(viewCount).format('0.a')} Views •
                        {moment(publishedAt).fromNow()}
                    </span>
                    <div>
                        <span className='mr-3'>
                            <MdThumbUp size={26} />
                            {numeral(likeCount).format('0.a')}
                        </span>
                        <span className='mr-3'>
                            <MdThumbDown size={26} />
                            {numeral(dislikeCount).format('0.a')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="video-meta-data-channel d-flex justify-content-between align-items-center my-2 py-3">
                <div className="d-flex">
                    <img
                        src={channelSnippet?.thumbnails?.default?.url}
                        alt="User"
                        className='rounded-circle mr-3'
                    />
                    <div className="d-flex flex-column">
                        <span>{channelTitle}</span>
                        <span>{numeral(channelStatistics?.subscriberCount).format('0.a')} Subscribers</span>
                    </div>
                </div>
                <button className={`btn border-0 p-2 m-2 ${subscriptionStatus && 'btn-gray'}`}>{subscriptionStatus ? 'Subscribed' : 'Subscribe'}</button>
            </div>
            <div className="video-meta-data-description">
                <ShowMoreText
                    lines={3}
                    more='SHOW MORE'
                    less='SHOW LESS'
                    anchorClass='showMoreText'
                    expanded={false}
                >{description}
                </ShowMoreText>
            </div>
        </div>
    )
}

export default VideoMetaData;