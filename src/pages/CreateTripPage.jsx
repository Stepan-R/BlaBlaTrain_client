import { useState } from 'react';
import classes from '../styles/CreateTripPage.module.css';
import { useAuthContext } from '../hooks/useAuthContext';

export const CreateTripPage = () => {
  const { user } = useAuthContext();
  const token = JSON.parse(localStorage.getItem('user')).token;
  console.log(token);

  const [formData, setFormData] = useState({
    departureTime: '',
    arrivingTime: '',
    travelFrom: '',
    travelTo: '',
    startDate: '',
    finishDate: '',
    travelTime: '',
    availableSeats: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3005/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          travelFrom: formData.travelFrom,
          travelTo: formData.travelTo,
          startDate: formData.startDate,
          finishDate: formData.finishDate,
          travelTime: formData.travelTime,
          avaiableSits: formData.availableSeats,
          price: formData.price,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Trip created:', data);
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  return (
    <div className={classes.layout}>
      <div className={classes.blocks}>
        <div>
          <form className={classes.trip_form} onSubmit={handleSubmit}>

            <label className={classes.post_label}>Departure at::</label>
            <input 
              className={classes.post_input}
              type='time'
              name='departureTime'
              value={formData.departureTime}
              onChange={handleChange}
            />

            <label className={classes.post_label}>Arriving at:</label>
            <input 
              className={classes.post_input} 
              type='time'
              name='arrivingTime'
              value={formData.arrivingTime}
              onChange={handleChange}
            />

            <label className={classes.post_label}>Travel from:</label>
            <input 
              className={classes.post_input} 
              type='text'
              name='travelFrom'
              value={formData.travelFrom}
              onChange={handleChange}
            />

            <label className={classes.post_label}>Travel to:</label>
            <input 
              className={classes.post_input} 
              type='text'
              name='travelTo'
              value={formData.travelTo}
              onChange={handleChange}
            />

            <label className={classes.post_label}>Start date:</label>
            <input 
              className={classes.post_input} 
              type='date'
              name='startDate'
              value={formData.startDate}
              onChange={handleChange}
            />

            <label className={classes.post_label}>Finish date:</label>
            <input 
              className={classes.post_input} 
              type='date'
              name='finishDate'
              value={formData.finishDate}
              onChange={handleChange}
            />

            <label className={classes.post_label}>Travel time:</label>
            <input 
              className={classes.post_input} 
              type='time'
              name='travelTime'
              value={formData.travelTime}
              onChange={handleChange}
            />

            <label className={classes.post_label}>Avaiable sits:</label>
            <input 
              className={classes.post_input} 
              type='number'
              name='availableSeats'
              value={formData.availableSeats}
              onChange={handleChange}
            />

            <label className={classes.post_label}>Price ($):</label>
            <input 
              className={classes.post_input} 
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
            />

            <button className={classes.post_btn} type='submit'>Publish your trip</button>

          </form>
        </div>
        <div className={classes.train_img}>
          <h2 className={classes.post_h2}>Publish your trip to travel together!</h2>
          <img 
            className={classes.person_img} 
            src='/person.webp' 
            alt='person in train'
          />
        </div>
      </div>
    </div>
  )
}