import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Card, Grid, Typography } from '@mui/material';

const BusinessCard = ({ lastMessage, message }) => {  
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
                  <span className="value">{message.open}</span>
                  <span className="label">Open</span>
              </div>
              <div className="item">
                  <span className="value">{message.close}</span>
                  <span className="label">Closing</span>
              </div>
              <div className="item">
                  <span className="value">{message.holiday}</span>
                  <span className="label">Holiday</span>
              </div>
            </div>
            <div className="card-about">
              <div className="item">
                <a href={"tel:"+message.contact}>
                  <PhoneIcon/>
                </a>
              </div>
              <div className="item">
                <a href={"https://wa.me/"+message.contact}>
                  <WhatsAppIcon />
                </a>
              </div>
              <div className="item">
              <a href={message.location}>
                  <PlaceIcon />
              </a>
              </div>
            </div>
        </div>
      </Card>
    );
  };
  
  export default BusinessCard;