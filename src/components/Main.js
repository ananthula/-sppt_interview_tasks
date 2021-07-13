import { useDispatch, useSelector } from "react-redux";

import { useLocation } from "react-router";
import { useEffect } from "react";
import EventDetails from './Events/EventDetails';
import * as actions from '../store/actions/index';


const Main = () => {
  const eventInfo = useSelector((state) => state.eventInfo);
  const errorMessage = useSelector(state => state.errorMessage);
  const location = useLocation();
  const loading = useSelector(state =>state.loading);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!loading)
        dispatch(actions.fetchSingleEvent(location.pathname?.split("/")[2]));
  }, [location,dispatch]);
  
  return (
    <div className="eventDetails">
      {errorMessage && 
        <div className="error">{errorMessage}</div>
      }
    {!errorMessage && !loading && eventInfo?.employees &&  
      (<>
        <p class="eventData">The employees for  {eventInfo.position.name} between {new Date(eventInfo.startsAt).toLocaleDateString()} and  {new Date(eventInfo.endsAt).toLocaleDateString()} are </p>
        <EventDetails eventInfo={eventInfo}></EventDetails>
      </>)  
    }
    </div>
  );
};
export default Main;
