import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
const TravelsCard = ({ lastMessage, message }) => {  
    return (
      <div className="card">
        <div className="card-avatar">
            <img alt="shop" src={"/api/images/"+message.fileName} width="150px" height="150px"/>
        </div>
        <div className="card-details">
            <h3><div className="name">{message.name}</div></h3>
            <div className="occupation">{message.address}</div>
            <div className="skills">
              <span className="value">{message.category}</span>
            </div>
            <div>{message.description}</div>
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
                  <img alt="Map" src="/images/maps.png" width="20px" height="20px"/>
              </a>
              </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default TravelsCard;