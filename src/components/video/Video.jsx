import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import moment from 'moment';
import numeral from 'numeral';

import request from '../../api';

import './video.scss';

import { AiFillEye } from 'react-icons/ai';

const Video = ({ video, channelScreen }) => {

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium }
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  // const seconds = moment.duration(duration).asSeconds();
  // const _duration = moment.utc(seconds * 1000).format('mm.ss');

  const videoId = id?.videoId || contentDetails?.videoId || id;
  // const videoId = id && id.videoId ? id.videoId : id;

  const navigate = useNavigate();

  useEffect(() => {
    const getVideoDetails = async () => {
      const { data: { items } } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: videoId
        }
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetails();
  }, [videoId]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const { data: { items } } = await request('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        }
      });
      setChannelIcon(items[0].snippet.thumbnails.medium.url);
    };
    get_channel_icon();
  }, [channelId]);

  const handleVideoClick = () => {
    navigate(`/watch/${videoId}`)
  };

  const formatDuration = (duration) => {
    const durationInSeconds = moment.duration(duration).asSeconds();
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    return hours > 0 
      ? `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  return (

    <div className="video" onClick={handleVideoClick}>

      <div className="video-top">
        {/* <img src={medium?.url} alt="Video thumbnail" /> */}
        <LazyLoadImage src={medium?.url} effect='blur' />
        <span className='video-duration'>{formatDuration(duration)}</span>
      </div>

      <div className="video-title">
        {title}
      </div>

      <div className="video details">
        <span>
          <AiFillEye /> {numeral(views).format('0.a')} Views • {''}
        </span>{''}
        <span>{moment(publishedAt).fromNow()}</span>
      </div>

      {!channelScreen &&

        <div className="video-channel">
          {/* <img src = {channelIcon?.url} alt="Channel picture" /> */}
          <LazyLoadImage src={channelIcon} effect='blur' />
          <p>{channelTitle}</p>
        </div>

      }

    </div>
  )
}

export default Video;