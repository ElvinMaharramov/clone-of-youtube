import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';
// import Skeleton from 'react-loading-skeleton';

import CategoriesBar from '../../components/categoriesBar/CategoriesBar';
import Video from '../../components/video/Video';
import SkeletonVideo from '../../components/skeletons/SkeletonVideo';

import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';

import { Col, Container, Row } from 'react-bootstrap';

const HomeScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPopularVideos())
    }, [dispatch]);

    const { videos, activeCategory, loading } = useSelector(state => state.homeVideos);

    const fetchData = () => {
        if (activeCategory === 'All') {
            dispatch(getPopularVideos())
        } else {
            dispatch(getVideosByCategory(activeCategory))
        }
    }

    return (
        <Container className='container'>

            <CategoriesBar />
            <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div className='spinner-border text-danger d-block mx-auto'>
                    </div>
                }
            >
                <Row>
                    {!loading
                        ? videos.map((video, index) => (
                            <Col lg={3} md={4} key={index}>
                                <Video video={video} key={video.id} />
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
    )
}

export default HomeScreen;