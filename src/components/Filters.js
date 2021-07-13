

import { React, useState } from "react";
import { format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions/index';
import {history} from '../history';


const Filters = () =>{
    const [startDate, setStartDate] = useState(
      history.location ?.search ?.split("&")[0] ?.split("=")[1] || ""
    );
    const [endDate, setEndDate] = useState(
      history.location ?.search ?.split("&")[1] ?.split("=")[1] || ""

    );  
    const dispatch = useDispatch();
    const offset = useSelector(state => state.offset);

    const handleChangeDate = (name,event) =>{
        if(name == "startDate"){
            setStartDate(event.target.value)
        }
        if(name == "endDate"){
            setEndDate(event.target.value)
        }
    }

    const onApplyClick = (isFromHistory) =>{
      if (isFromHistory !== true) {
        const url = `/events?startsAt=${startDate}&endsAt=${endDate}`;
        history.push(url);
      }
  
    const data ={
        offset:offset,
        startDate:startDate,
        endDate:endDate
    }
    dispatch(actions.fetchEvents(data,true))
  
    }
    return (
        <div className="filters">
       
    <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(event) => handleChangeDate("startDate",event)}
        />
         {startDate && (
          <div>
            <label htmlFor="endDate">End Date:</label>
            <input
            value={endDate}
              type="date"
              min={format(new Date(startDate), "yyyy-MM-dd")}
              onChange={(event) => handleChangeDate("endDate",event)}
            />
          </div>
        )}
        {startDate && endDate && <button className="filter" id="filter-button" onClick={onApplyClick}>
          Apply
        </button>}
    </div>
    );

}

export default Filters;

