import * as actionTypes from './actionTypes';

let headers = new Headers();
 headers.set("Authorization", "Basic " + window.btoa("frontend@shyftplan.com"
           + ":" + "api_test_auth_token"));
export const fetchEventsSuccess = (data) =>{
    return{
        type:actionTypes.FETCH_EVENTS_SUCCESS,
        data:data
    }
}
export const fetchEventsStart = () =>{
    return{
        type:actionTypes.FETCH_EVENTS_START
    }
}

export const fetchSingleEventSuccess = (data) =>{
    return {
        type:actionTypes.FETCH_SINGLE_EVENT_SUCCESS,
        data,
    }
}
export const fetchSingleEventFailure = ()=>{
    return {
        type:actionTypes.FETCH_SINGLE_EVENT_FAILURE
    }
}

export const fetchEvents = (data, bFromFilters) =>{
    return dispatch =>{
        dispatch(fetchEventsStart());
        let offset = data.offset;
       
           let url =  "https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/events?limit=10";
       
        url = `${url}&offset=${offset}`;
        if(data.startDate){
            let startDate = data.startDate;
            let endDate = data.endDate;
            url = `${url}&startsAt=${startDate}&endsAt=${endDate}`;
        }
                fetch(url, {
                    method:'GET',
                    headers:headers
                }).then(response => response.json())
                .then(data =>{
                     const eventsInfo = {
                         ...data,
                         bFromFilters
                     }
                   return  dispatch(fetchEventsSuccess(eventsInfo))
                }
                )
                .catch(err =>{})

                

    }
}

export const fetchSingleEvent = (data) =>{
    return dispatch =>{
        dispatch(fetchEventsStart());
        
        let url =  "https://fyx8bq1lpa.execute-api.eu-central-1.amazonaws.com/Prod/events";
         url =  `${url}/${data}`;

        
        
    fetch(url,{
        method:'GET',
        headers:headers
    }).then(response =>response.json())
    .then(data =>{
        if(data.employees.length > 0)
            return dispatch(fetchSingleEventSuccess(data));
        else{
            return dispatch(fetchSingleEventFailure(data));
        }
    }
       )
    .catch(err =>{})
}
}