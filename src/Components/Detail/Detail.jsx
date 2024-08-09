import "./Detail.css"
import { assets } from "../../assets/assets"

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src={assets.avatar} alt="" />
        <h2>Hotaru</h2>
        <h2 >Gomen, amanai. Ore wa ima~~ omae no</h2>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
             <h2>Chat Setting</h2>
             <img src={assets.arrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
             <h2>Privay % help</h2>
             <img src={assets.arrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
             <h2>Shared photos</h2>
             <img src={assets.arrowDown} alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                 <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-chill-9.jpg" alt="" />
               <h2>photo_2024_2.png</h2>
              </div>
              <img src={assets.download} alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                 <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-chill-9.jpg" alt="" />
               <h2>photo_2024_2.png</h2>
              </div>
              <img src={assets.download} alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
             <h2>Shared Files</h2>
             <img src={assets.arrowUp} alt="" />
          </div>
        </div>
        <button>Block User</button>
      </div>
    </div>
  )
}

export default Detail
