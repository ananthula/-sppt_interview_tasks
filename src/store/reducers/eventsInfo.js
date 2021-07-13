import * as actionTypes from '../actions/actionTypes';
const initialState = {
    loading:false,
    events:[],
    eventInfo:"",
    offset:0,
    totalEvents:0,
    errorMessage:"",
    filteredEvents:[]
    
}
const reducer = (state=initialState, action) =>{

    switch(action.type){
        case actionTypes.FETCH_EVENTS_SUCCESS:
            
            return {
                ...state,
                events:action.data.bFromFilters ? [].concat(action.data.items) : state.events.concat(action.data.items),
                offset:action.data.pagination.offset || state.offset,
                totalEvents:action.data.pagination.count || state.count,
                loading:false,
            }
            case actionTypes.FETCH_EVENTS_START:
                return {
                    ...state,
                    loading:true
                }
           
            case actionTypes.INCREMENT_OFFSET:
                return{
                    ...state,
                    offset:action.payload
                }
            case actionTypes.FETCH_SINGLE_EVENT_SUCCESS:
                return{
                    ...state,
                    eventInfo:action.data,
                    errorMessage:"",
                    loading:false

                }
                case actionTypes.RESET_EVENTS_LIST:
                    return{
                        ...state,
                        eventInfo:"",
                        errorMessage:"",
                        
                    }
                case actionTypes.FETCH_SINGLE_EVENT_FAILURE:
                    return {
                        ...state,
                        errorMessage:"The event information requested is not found"
                    }
               

                
            default:
                return state;
    }
  

}

export default reducer;