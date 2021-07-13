import {React} from 'react';
import Card from "react-bootstrap/Card";

const EventDetails = ({eventInfo}) =>{

    const eventToDisplay = (<div>
        {eventInfo && eventInfo.employees.map(ev =>{
            return (
                <div className="cardWrapper" key={ev.id }  >
                  <Card className="customCard">
                    <Card.Body>
                    
                      <Card.Text className="cardText">{ev.firstName} </Card.Text>
                      <Card.Text className="cardText">{ev.lastName} </Card.Text>
  
                      <Card.Text className="cardText">
                        <img
                          src={ev.image}
                          id="view-details"
                         alt ="image"
                        >
                        </img>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                </div>
            )

            
        })}
    </div>
       
       )
    
    return(
        <div className="eventDetails">
        {eventToDisplay}
   
   </div>
    );
}

export default EventDetails;