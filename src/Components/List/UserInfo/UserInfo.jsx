import React from 'react'
import "./UserInfo.css"
import { assets } from '../../../assets/assets'

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
      <img className="avatar" src={assets.avatar} alt="" />
      <h2>Hotaru</h2>
      </div>
      <div className="icons">
        <img className="more" src={assets.more} alt="" />
        <img className="video" src={assets.video} alt="" />
        <img className="edit" src={assets.edit} alt="" />
      </div>
    </div>
  )
}

export default UserInfo
