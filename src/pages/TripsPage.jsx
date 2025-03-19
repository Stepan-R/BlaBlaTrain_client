import { TripCard } from '../components/TripCard';
import classes from '../styles/TripsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTrips } from '../features/tripsSlice';
import { filterTrips, handlefilter } from '../utils/tripFilters';
import { useSearchParams } from 'react-router-dom';

export const TripsPage = () => {
  const dispatch = useDispatch();
  const { trips, loading, error } = useSelector((state) => state.trips);
  const [sortedTrips, setSortedTrips] = useState(trips);
  const [count, setCount] = useState(trips.length);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get('filter') || ''); 
  const [search, setSearch] = useState(searchParams.get('search') || '');
  
  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (filter) params.filter = filter;
    setSearchParams(params);
  }, [search, filter, setSearchParams]);

  useEffect(() => {
    const filteredTrips = filterTrips(trips, search);
    setSortedTrips(filteredTrips);
    setCount(filteredTrips.length);
  }, [trips, search]);

  const handleSort = (action) => {
    setFilter(action);
    const newSortedTrips = handlefilter(sortedTrips, action);
    setSortedTrips(newSortedTrips);
  };

  if (error) {
    return (
      <h2>{error}</h2>
    )
  }

  return (
    <div className={classes.layout}>
      <div className={classes.trips_cities}>
        <h2 className={classes.home_title}>Train Schedule</h2>
      </div>
      {loading ? (
        <h3>Trips are getting loaded</h3>
      ) : (
        <>
              <div className={classes.search_layout}>
        <div className={classes.search_block}>
          <input 
            type='text' 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className={classes.trips_search}
            placeholder='Where are you going, mate ?'
          />
          <div className={classes.span_block}>
            <img src='/leftArrow.svg' alt='arrow' className={classes.span_arrow} />
            <span className={classes.search_span} >Type your city here to find a train</span>
          </div>
        </div>
        <div className={classes.search_block}>
          <p className={classes.search_trips}>{count} trips found</p>
          <div className={classes.filter_btns}>
            <button 
              className={classes.filter_btn} 
              onClick={() => handleSort('departure')}
            >
              Departure time
            </button>
            <button 
              className={classes.filter_btn}
              onClick={() => handleSort('arriving')}
            >
              Arrival time
            </button>
            <button 
              className={classes.filter_btn}
              onClick={() => handleSort('traveltime')}
            >
              Travel time
            </button>
            <button 
              className={classes.filter_btn}
              onClick={() => handleSort('price')}
            >
              Price
            </button>
          </div>
        </div>
      </div>
      <div>
        {sortedTrips.map(trip => (
          <TripCard trip={trip} key={trip._id} />
        ))}
      </div>
        </>
      )}
    </div>
  )
}