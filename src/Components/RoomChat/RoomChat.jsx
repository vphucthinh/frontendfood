import React, { useState } from 'react'
import "./RoomChat.css"
import { assets } from '../../assets/assets'
import EmojiPicker from "emoji-picker-react"

const RoomChat = () => {

  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")

  const handleEmoji = e => {
    setText((prev) => prev + e.emoji);
    setOpen(false)
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={assets.avatar} alt="" />
          <div className="texts">
             <span>Hotaru</span>
             <p>Gomene, amanai. Ore wa ima~~ omae no</p>
          </div>
        </div>
        <div className="icons">
          <img src={assets.phone} alt="" />
          <img src={assets.video} alt="" />
          <img src={assets.info} alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src={assets.avatar} alt="" />
          <div className="texts">
              <p>Gomen, amanai. Ore wa ima~~ omae no</p>
              <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
              <p>Gomen, amanai. Ore wa ima~~ omae no</p>
              <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src={assets.avatar} alt="" />
          <div className="texts">
              <p>Gomen, amanai. Ore wa ima~~ omae no</p>
              <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
              <p>Gomen, amanai. Ore wa ima~~ omae no</p>
              <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src={assets.avatar} alt="" />
          <div className="texts">
              <p>Gomen, amanai. Ore wa ima~~ omae no</p>
              <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-chill-9.jpg"  alt="" />
              <p>Gomen, amanai. Ore wa ima~~ omae no</p>
              <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src={assets.img} alt="" />
          <img src={assets.camera} alt="" />
          <img src={assets.mic} alt="" />
        </div>
        <input type="text" placeholder="Type a message..." value={text} onChange={e=>setText(e.target.value)} />
        <div className="emoji">
          <img src={assets.emoji} alt="" onClick={()=>setOpen(prev=>!prev)} />
          <div className="picker">
              <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  )
}

export default RoomChat
