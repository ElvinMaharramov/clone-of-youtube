import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action';

import './categoriesBar.scss';

const keywords = [
  'All',
  'Front-end Development',
  'Back-end Development',
  'Full-stack Development',
  'HTML5',
  'CSS3',
  'JavaScript',
  'ECMAScript',
  'React.js',
  'Redux',
  'Toolkit',
  'Angular',
  'Vue.js',
  'SASS',
  'Bootstrap',
  'Tailwind',
  'Algoritms',
  'Coding'
];

const CategoriesBar = () => {

  const [activeElement, setActiveElement] = useState('All');

  const dispatch = useDispatch();

  const handleClick = (item) => {
    setActiveElement(item);
    if(item === 'All'){
      dispatch(getPopularVideos());
    }else{
      dispatch(getVideosByCategory(item));
    }
  };

  return (
    <div className='CategoriesBar'>
      {keywords.map((item, index) =>
        <span
          onClick={() => handleClick(item)}
          className={activeElement === item ? 'active' : ''}
          key={index}> {item} </span>
      )}
    </div>
  )
}

export default CategoriesBar;