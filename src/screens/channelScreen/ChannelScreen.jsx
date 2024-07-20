import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import numeral from 'numeral';

import Video from '../../components/video/Video';
import { getVideosByChannel } from '../../redux/actions/videos.action';
import { checkSubscriptionStatus, getChannelDetails } from '../../redux/actions/channel.action';

import { Col, Container, Row } from 'react-bootstrap';
import './channelScreen.scss';

const ChannelScreen = () => {


    const { channelId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideosByChannel(channelId))
        dispatch(getChannelDetails(channelId))
        dispatch(checkSubscriptionStatus(channelId))
    }, [dispatch, channelId]);

    const { videos, loading } = useSelector(state => state.channelVideos);
    const { snippet, statistics } = useSelector(state => state.channelDetails.channel);
    const subscriptionStatus = useSelector(
        state => state.channelDetails.subscriptionStatus
    );

    

    return (
        <>

            <div className='px-5 py-2 my-2 d-flex justify-content-between align-items-center channel-header'>
                <div className='d-flex align-items-center channel-header-left'>
                    <img src={snippet?.thumbnails?.default?.url} alt="Channel-profile-image" />

                    <div className='ml-3 channel-header-details'>
                        <h3>{snippet?.title}</h3>
                        <span>
                            {numeral(statistics?.subscriberCount).format('0.a')}{''} subscribers
                        </span>
                    </div>
                </div>

                {/* <button className=''>Subscribe</button> */}
                <button className={`btn border-0 p-2 m-2 ${subscriptionStatus && 'btn-gray'}`}>{subscriptionStatus ? 'Subscribed' : 'Subscribe'}</button>
            </div>
            
            <Container>
                <Row className='mt-2'>
                    {
                        !loading ?
                            videos?.map((video, index) =>
                                <Col
                                    key={index}
                                    md={4}
                                    lg={3}
                                >
                                    <Video video={video} channelScreen />
                                </Col>)
                            : [...Array(15)].map((_, index) =>
                                <Col
                                    key={index}
                                    md={4}
                                    lg={3}
                                >
                                    <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                                        <Skeleton width='100%' height='140px' />
                                    </SkeletonTheme>
                                </Col>)
                    }
                </Row>
            </Container>
        </>
    )
}

export default ChannelScreen;