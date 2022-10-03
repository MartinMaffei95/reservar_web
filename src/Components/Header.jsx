import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

const Header = ({ title, children }) => {
  // Recives in the children button to post a Post or Comment
  const navigate = useNavigate();

  return (
    <header>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        <MdArrowBackIosNew />
      </button>
      {title && <span className="header_title">{title}</span>}
      <div>{children}</div>
    </header>
  );
};

export default Header;
