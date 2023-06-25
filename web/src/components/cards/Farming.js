import { Card } from "@mui/material";

const FarmingCard = ({ lastMessage, message }) => {  
    return (
      <Card>
        <img alt="shop" src={message.fileName} width="100%" height="150px"/>
        <div className="card-details">
            <h3><div className="name">{message.name}</div></h3>
            <div className="occupation">{message.address}</div>
            <div className="skills">
              <span className="value">{message.category}</span>
            </div>
            <div>{message.description}</div>
            <div className="card-about">
              <div className="item">
                  <span className="value">{message.location}</span>
                  <span className="label">Location</span>
              </div>
              <div className="item">
                  <span className="value">{message.price}</span>
                  <span className="label">Pricing</span>
              </div>
            </div>
            <div className="card-about">
              <div className="item">
                <a href={"tel:"+message.contact}>
                  <img alt="Phone" src="/images/phone.png" width="20px" height="20px"/>
                </a>
              </div>
              <div className="item">
                <a href={"https://wa.me/"+message.contact}>
                  <img alt="Whatsapp" src="/images/whatsapp.jpeg" width="20px" height="20px"/>
                </a>
              </div>
              <div className="item">
              <a href={message.location}>
                  <img alt="Map" src="/images/maps.png" width="20px" height="20px"/>
              </a>
              </div>
            </div>
        </div>
      </Card>
    );
  };
  
  export default FarmingCard;