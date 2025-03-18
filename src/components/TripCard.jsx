import classes from '../styles/TripCard.module.css';

export const TripCard = () => {
  return (
    <div  className={classes.layout}>
      <div className={classes.left_block}>
        <div className={classes.time_block}>
          <div>
            <p className={classes.time}>07:36</p>
            <p className={classes.date}>02.02.2002</p>
          </div>
          <div>
            <span>------</span>
            <span className={classes.travel_time}> 2h. 35m. </span>
            <span>------</span>
          </div>
          <div>
            <p className={classes.time}>11:36</p>
            <p className={classes.date}>02.02.2002</p>
          </div>
        </div>
        <div className={classes.train_info}>
          <img className={classes.icon} src='/picture.svg' alt='train' />
          <div>
            <p>1130 Pasangers</p>
            <p>Kyiv - Lviv</p>
          </div>
        </div>
        <span className={classes.bottom_info}>Electronic ticket</span>
      </div>
      <div className={classes.right_block}>
        <p className={classes.sits_p}>16 Avaiable sits</p>
        <h3 className={classes.price}>1080$</h3>
      </div>
    </div>
  )
}