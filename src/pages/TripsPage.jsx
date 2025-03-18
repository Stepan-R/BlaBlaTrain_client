import { Search } from '../components/Search';
import { TripCard } from '../components/TripCard';
import classes from '../styles/TripsPage.module.css';

export const TripsPage = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.trips_cities}>
        <h2>Kyiv -- Lviv</h2>
      </div>
      <div className={classes.search_layout}>
        <Search />
        <div className={classes.search_block}>
          <p className={classes.search_trips}>10 trips found</p>
          <div className={classes.filter_btns}>
            <button className={classes.filter_btn}>Departure time</button>
            <button className={classes.filter_btn}>Arrival time</button>
            <button className={classes.filter_btn}>Travel time</button>
            <button className={classes.filter_btn}>Price</button>
          </div>
        </div>
      </div>
      <div>
        <TripCard />
        <TripCard />
        <TripCard />
      </div>
    </div>
  )
}