import React from 'react';

const Chevron = ({ className }) => {
  return (
    <svg className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#7174AC"/>
    </svg>
  );
};

export default Chevron;