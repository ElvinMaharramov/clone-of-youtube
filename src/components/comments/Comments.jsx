import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Comment from '../comment/Comment';
import { addComment, getCommentsOfVideoById } from '../../redux/actions/comments.action';

import YouTubeProfileImage from '../../assets/img/YouTube-profile-image.png';

import './comments.scss';

const Comments = ({ videoId, totalComments }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId))
  }, [videoId, dispatch]);

  const comments = useSelector(state => state.commentList.comments);
  const _comments = comments?.map(comment => comment.snippet.topLevelComment.snippet);

  const [text, setText] = useState('');

  const handleComment = (e) => {

    e.preventDefault();
    if (text.length !== 0){
      dispatch(addComment(videoId, text));
      setText('');
    }
  }

  return (
    <div className='comments'>

      <p>{totalComments} Comments</p>
      {/* <p>{_comments?.length} Comments</p> */}

      <div className="comments-form d-flex w-100 m-2">

        <img
          src={YouTubeProfileImage}
          alt="User"
          className='rounded-circle mr-3'
        />

        <form
          onSubmit={handleComment}
          className="d-flex flex-grow-1">

          <input
            type="text"
            className="flex-grow-1"
            placeholder='Write a comment'
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <button className="border-0 p-2">Comment</button>

        </form>

      </div>

      <div className="comments-list">
        {
          _comments?.map(
            (comment, index) => (
              <Comment
                comment={comment}
                key={index}
              />
            )
          )
        }
      </div>

    </div>
  )
}

export default Comments;