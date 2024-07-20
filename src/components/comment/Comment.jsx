import React from 'react';

// import YouTubeProfileImage from '../../assets/img/YouTube-profile-image.png';

import moment from 'moment';

import './comment.scss';

const Comment = ({comment}) => {

    const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } = comment;

    return (
        <div className='comment p-2 d-flex'>

            <img
                src={authorProfileImageUrl}
                alt=""
                className='rounded-circle mr-3'
            />

            <div className="comment-body">
                <p
                    className="comment-header mb-1">
                    {authorDisplayName} • {moment(publishedAt).fromNow()}
                </p>

                <p className='mb-0'>{textDisplay}</p>

            </div>

        </div>
    )
}

export default Comment;