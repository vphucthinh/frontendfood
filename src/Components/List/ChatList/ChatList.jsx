import React, { useState } from 'react';
import './ChatList.css';
import { assets } from '../../../assets/assets';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={assets.search_icon} alt="Search Icon" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          className="plus"
          src={addMode ? assets.minus : assets.plus}
          alt="Add Icon"
          onClick={() => setAddMode(prev => !prev)}
        />
      </div>
      <div className="chatItems">
        {[...Array(4)].map((_, index) => (
          <div className="item" key={index}>
            <img src={assets.avatar} alt="Avatar" className="avatar" />
            <div className="texts">
              <span className="name">Hotaru</span>
              <p className="message">Hello</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
