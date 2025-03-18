import classes from '../styles/CreateTripPage.module.css';

export const CreateTripPage = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.blocks}>
        <div>
          <form className={classes.trip_form}>

            <label className={classes.post_label}>Travel from:</label>
            <input className={classes.post_input} type='text'/>

            <label className={classes.post_label}>Travel to:</label>
            <input className={classes.post_input} type='text'/>

            <label className={classes.post_label}>Start date:</label>
            <input className={classes.post_input} type='date'/>

            <label className={classes.post_label}>Finish date:</label>
            <input className={classes.post_input} type='date'/>

            <label className={classes.post_label}>Travel time:</label>
            <input className={classes.post_input} type='time'/>

            <label className={classes.post_label}>Avaiable sits:</label>
            <input className={classes.post_input} type='number'/>

            <label className={classes.post_label}>Price ($):</label>
            <input className={classes.post_input} type='number'/>

            <button className={classes.post_btn}>Publish your trip</button>

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