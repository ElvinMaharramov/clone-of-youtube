import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Container, Row } from 'react-bootstrap';

import Video from '../../components/video/Video';
import SkeletonVideo from '../../components/skeletons/SkeletonVideo';
import { getLikedVideos } from '../../redux/actions/videos.action';

const LikedVideosScreen = () => {
    const dispatch = useDispatch();

    const { videos, loading } = useSelector(state => state.likedVideos);

    useEffect(() => {
        dispatch(getLikedVideos());
    }, [dispatch]);

    const fetchData = () => {
        dispatch(getLikedVideos());
    };

    return (
        <Container>
            <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div className='spinner-border text-danger d-block mx-auto'></div>
                }
            >
                <Row>
                    {!loading
                        ? videos.map((video, index) => (
                            <Col lg={3} md={4} key={index}>
                                <Video video={video} />
                            </Col>
                        ))
                        : [...Array(20)].map((_, index) => (
                            <Col lg={3} md={4} key={index}>
                                <SkeletonVideo />
                            </Col>
                        ))
                    }
                </Row>
            </InfiniteScroll>
        </Container>
    );
};

export default LikedVideosScreen;
