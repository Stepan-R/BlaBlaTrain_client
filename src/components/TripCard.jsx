import { useDispatch } from 'react-redux';
import classes from '../styles/TripCard.module.css';
import moment from 'moment';
import { fetchTrips } from '../features/tripsSlice';
import { useEffect, useRef, useState } from 'react';
import { deleteTrip, updateTrip } from '../api/tripService';

export const TripCard = ({ trip }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    startTime: trip.startTime,
    finishTime: trip.finishTime,
    travelFrom: trip.travelFrom,
    travelTo: trip.travelTo,
    startDate: trip.startDate,
    finishDate: trip.finishDate,
    travelTime: trip.travelTime,
    availableSeats: trip.avaiableSits,
    price: trip.price
  });
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const hasChanges = () => {
    return (
      formData.startTime !== trip.startTime ||
      formData.finishTime !== trip.finishTime ||
      formData.travelFrom !== trip.travelFrom ||
      formData.travelTo !== trip.travelTo ||
      formData.startDate !== trip.startDate ||
      formData.finishDate !== trip.finishDate ||
      formData.travelTime !== trip.travelTime ||
      formData.availableSeats !== trip.avaiableSits ||
      formData.price !== trip.price
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTrip(id);
      dispatch(fetchTrips());
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const handleUpdate = async (id) => {
    if (!hasChanges()) {
      setIsEditing(false);
      return;
    }

    try {
      await updateTrip(id, formData);
      dispatch(fetchTrips());
      setIsEditing(false);
    } catch (error) {
      alert(`Failed to update trip. ${error}`);
    }
  };

  return (
    <div  className={classes.layout} ref={ref} >
      <div className={classes.left_block}>
        <div className={classes.time_block}>
          {isEditing ? (
            <div className={classes.flex}>
              <input 
                type='time' 
                name='startTime' 
                value={formData.startTime}
                onChange={handleChange}
                className={classes.time_input}
              />
              <input 
                type='date' 
                name='startDate'
                value={moment(formData.startDate).format('YYYY-MM-DD')}
                onChange={handleChange}
                className={classes.time_input}
              />
            </div>
          ) : (
            <div>
              <p className={classes.time}>{trip.startTime}</p>
              <p className={classes.date}>{moment(trip.startDate).format('MMMM D, YYYY')};</p>
            </div>
          )}
          {isEditing ? (
            <div>
              <input 
                type='time' 
                name='travelTime'
                value={formData.travelTime} 
                onChange={handleChange}
                className={classes.time_input}
              />
            </div>
          ) : (
            <div>
              <span>------</span>
              <span className={classes.travel_time}> {trip.travelTime} </span>
              <span>------</span>
          </div>
          )}

          {isEditing ? (
            <div className={classes.flex}>
              <input 
                type='time' 
                name='finishTime' 
                value={formData.finishTime} 
                onChange={handleChange}
                className={classes.time_input}
              />
              <input 
                type='date' 
                name='finishDate'
                value={moment(formData.finishDate).format('YYYY-MM-DD')}
                onChange={handleChange}
                className={classes.time_input}
              />
            </div>
          ) : (
            <div>
              <p className={classes.time}>{trip.finishTime}</p>
              <p className={classes.date}>{moment(trip.finishDate).format('MMMM D, YYYY')};</p>
            </div>
          )}
          
        </div>
        <div className={classes.train_info}>
          <img className={classes.icon} src='/picture.svg' alt='train' />
          <div>
            <p>#1130 Pasangers</p>
            {isEditing ? (
              <div>
                <input 
                  type='text' 
                  name='travelFrom' 
                  value={formData.travelFrom} 
                  onChange={handleChange}
                  className={classes.text_input}
                />
                <span className={classes.black_color}> ---{">"} </span>
                <input 
                  type='text' 
                  name='travelTo' 
                  value={formData.travelTo} 
                  onChange={handleChange}
                  className={classes.text_input}
                />
              </div>
            ) : (
              <p>{trip.travelFrom} - {trip.travelTo}</p>
            )}
          </div>
        </div>
        <span className={classes.bottom_info}>Electronic ticket</span>
      </div>
      <div className={classes.right_block}>
        {isEditing ? (
        <div className={classes.right_edit_block}>
          <div className={classes.row_flex}>
            <input 
              type='number' 
              name='availableSeats' 
              value={formData.availableSeats} 
              onChange={handleChange} 
              className={classes.number_input}
            />
            <span>Avaiable sits</span>
          </div>
          <div className={classes.row_flex}>
            <input 
              type='number' 
              name='price' 
              value={formData.price} 
              onChange={handleChange} 
              className={classes.number_input}
            />
            $
          </div>

        </div>
        ) : (
          <>
            <p className={classes.sits_p}>{trip.avaiableSits} Avaiable sits</p>
            <h3 className={classes.price}>{trip.price}$</h3>
          </>
        )}

        <div>
          {isEditing ? (
            <>
            <img 
              src='/done.svg' 
              alt='doneArrow' 
              className={classes.card_img} 
              onClick={() => handleUpdate(trip._id)}
            />

            <img 
            src='/delete.svg' 
            alt='doneArrow' 
            className={classes.card_img} 
            onClick={() => setIsEditing(false)} 
          />
          </>
          ) : (
            <>
            <img 
              src='/edit.svg' 
              alt='doneArrow' 
              className={classes.card_img} 
              onClick={() => setIsEditing(true)}
            />
            <img 
            src='/delete.svg' 
            alt='doneArrow' 
            className={classes.card_img} 
            onClick={() => handleDelete(trip._id)} 
          />
            </>
          )}
        </div>
      </div>
    </div>
  )
}