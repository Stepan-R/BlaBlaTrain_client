import { useState } from 'react';
import classes from '../styles/CreateTripPage.module.css';
import { submitTrip } from '../api/tripService';

export const CreateTripPage = () => {
  const initialFormData = {
    startTime: '',
    finishTime: '',
    travelFrom: '',
    travelTo: '',
    startDate: '',
    finishDate: '',
    travelTime: '',
    availableSeats: '',
    price: ''
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      formData.startTime,
      formData.finishTime,
      formData.travelFrom,
      formData.travelTo,
      formData.startDate,
      formData.finishDate,
      formData.travelTime,
      formData.availableSeats,
      formData.price
    ];

    const allFieldsFilled = requiredFields.every(field => field.trim() !== '');

    if (!allFieldsFilled) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const result = await submitTrip(formData);
      console.log('Trip submitted successfully:', result);
      
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting trip:', error);
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
              name='startTime'
              value={formData.startTime}
              onChange={handleChange}
            />

            <label className={classes.post_label}>Arriving at:</label>
            <input 
              className={classes.post_input} 
              type='time'
              name='finishTime'
              value={formData.finishTime}
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