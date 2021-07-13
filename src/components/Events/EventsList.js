import {React, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from "react-bootstrap/Card";
import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';
import {history} from '../../history';


function EventsList() {
    const events = useSelector(state =>  state.events);
    const totalEvents = useSelector(state => state.totalEvents); 
    const offset = useSelector(state =>state.offset);
    const loading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const sDate =  history.location ?.search ?.split("&")[0] ?.split("=")[1] || "";
    const eDate = history.location ?.search ?.split("&")[1] ?.split("=")[1] || "";

    useEffect(() => {
            let data = {
                offset,
                startDate:sDate,
                endDate:eDate
            }
            if(events.length  == 0)
              dispatch(actions.fetchEvents(data, sDate !=="" ? true : false)); 
        
    },[])

    const showEventDetailsHandler = (event,id) =>{
      dispatch(actions.fetchSingleEvent(id));
      const url = `/events/${id}`;
      history.push({pathname:url});
    }

    const dataToDisplay = (<div>
        {events && events.map((ev) => {
            return (
                <div className="cardWrapper" key={ev.id + "-" +ev.position.id}  onClick={(event) =>
                  showEventDetailsHandler(event, ev.id)}>
                <Card className="customCard">
                  <Card.Body>
                    <Card.Title className="cardTitle">
                      {ev.position.name}
                    </Card.Title>
                    <Card.Text className="cardText">{new Date(ev.startsAt).toLocaleDateString()} </Card.Text>
                    <Card.Text className="cardText">{new Date(ev.endsAt).toLocaleDateString()} </Card.Text>

                  </Card.Body>
                </Card>
                <br />
              </div>
            );
        })}
    </div>)
const onLoadMore = () =>{
    dispatch({type:actionTypes.INCREMENT_OFFSET, payload:offset + 10});
    let url ="";
    let data = {
      offset:offset + 10
    }
    if(sDate && eDate){
      url  = `/events?startsAt=${sDate}&endsAt=${eDate}`;
      history.push(url);
         data ={
          ...data,
          startDate:sDate,
          endDate:eDate
        }
      }
      dispatch(actions.fetchEvents(data)); 
}
   
    return (
        <>
       { <div className="allEventsList">
            {dataToDisplay}
       { offset + 10 < totalEvents  ? <button className="btn-load-more" onClick = {onLoadMore}>{loading ? 'Loading...' : 'Load More'}</button> : ''}
       </div>}
       </>
    );
}

export default EventsList;
