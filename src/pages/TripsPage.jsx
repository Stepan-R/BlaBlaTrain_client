import { Search } from '../components/Search';
import { TripCard } from '../components/TripCard';
import classes from '../styles/TripsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTrips } from '../features/tripsSlice';

export const TripsPage = () => {
  const dispatch = useDispatch();
  const { trips, loading, error } = useSelector((state) => state.trips);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

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
        {trips.map(trip => (
          <TripCard trip={trip} key={trip._id} />
        ))}
      </div>
    </div>
  )
}