import React, { useState } from 'react'
import "./Chatting.css"
import List from '../../Components/List/List'
import Detail from '../../Components/Detail/Detail'
import RoomChat from '../../Components/RoomChat/RoomChat'

const Chatting = () => {

    const [category, setCategory] = useState("All");
 
  return (
    <div className="Container">  
      <List category={category} setCategory={setCategory}/>
      <RoomChat category={category} setCategory={setCategory} />
      <Detail category={category}/>
    </div>
  )
}

export default Chatting
