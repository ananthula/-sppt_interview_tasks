
import Filters from './Filters';
import EventsList from './Events/EventsList';

const Dashboard = () =>{
    return(
      <div className="eventsList">
        <Filters />
        <EventsList />
    </div>
    );
}

export default Dashboard;