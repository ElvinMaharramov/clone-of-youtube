import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import moment from 'moment';
import numeral from 'numeral';

import request from '../../api';

import { AiFillEye } from 'react-icons/ai';

import { Col, Row } from 'react-bootstrap';

import YouTubeProfileİmage from '../../assets/img/YouTube-profile-image.png';
import './videoHorizontal.scss';

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const isVideo = !(id.kind === 'youtube#channel' || subScreen);

  useEffect(() => {
    const getVideoDetails = async () => {
      const { data: { items } } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: id.videoId
        }
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    if (isVideo) {
      getVideoDetails();
    };
  }, [id, isVideo])

  useEffect(() => {
    const get_channel_icon = async () => {
      const { data: { items } } = await request('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        }
      });
      // setChannelIcon(items[0].snippet.thumbnails.medium.url);
      if (items && items.length > 0) {
        setChannelIcon(items[0].snippet.thumbnails.medium.url);
      }
    };
    get_channel_icon();
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm.ss');

  const navigate = useNavigate();

  const _channelId = resourceId?.channelId || channelId;

  const handleClick = () => {
    isVideo
      ? navigate(`/watch/${id.videoId}`)
      : navigate(`/channel/${_channelId}`)
  };

  const thumbnail = !isVideo && 'video-horizontal-thumbnail-channel';

  return (
    <Row className='video-horizontal m-1 py-2 align-items-center' onClick={handleClick}>
      <Col
        xs={6}
        md={searchScreen || subScreen ? 4 : 6}
        className='video-horizontal-left'
      >
        <LazyLoadImage
          src={medium?.url}
          effect='blur'
          className={`video-horizontal-thumbnail ${thumbnail} mr-3`}
          wrapperClassName='video-horizontal-thumbnail-wrapper'
        />

        {
          isVideo &&
          <span className='video-duration'>{_duration}</span>
        }

      </Col>

      <Col
        xs={6}
        md={searchScreen || subScreen ? 8 : 6}
        className='video-horizontal-right p-0'
      >

        <p className="video-horizontal-title mb-1">
          {title}
        </p>

        {isVideo &&
          <div className="video-horizontal-details">
            <AiFillEye />
            {numeral(views).format('0.a')} Views •
            {moment(publishedAt).fromNow()}
          </div>
        }

        {(searchScreen || subScreen) && <p
          className='mt-1 video-horizontal-description'
        >
          {description}
        </p>
        }

        <div className="video-horizontal-channel d-flex align-items-center my-1">
          {isVideo && channelIcon && <LazyLoadImage
            src={channelIcon}
            effect='blur'
          />}
          <p className='mb-0'>{channelTitle}</p>
        </div>
        {subScreen && (
          <p className='mt-2'>
            {video.contentDetails.totalItemCount} Videos
          </p>
        )}
      </Col>
    </Row>
  )
}

export default VideoHorizontal;