import classes from '../styles/TripCard.module.css';
import moment from 'moment';

export const TripCard = ({ trip }) => {
  return (
    <div  className={classes.layout}>
      <div className={classes.left_block}>
        <div className={classes.time_block}>
          <div>
            <p className={classes.time}>{trip.startTime}</p>
            <p className={classes.date}>{moment(trip.startDate).format('MMMM D, YYYY')};</p>
          </div>
          <div>
            <span>------</span>
            <span className={classes.travel_time}> {trip.travelTime} </span>
            <span>------</span>
          </div>
          <div>
            <p className={classes.time}>{trip.finishTime}</p>
            <p className={classes.date}>{moment(trip.finishDate).format('MMMM D, YYYY')}</p>
          </div>
        </div>
        <div className={classes.train_info}>
          <img className={classes.icon} src='/picture.svg' alt='train' />
          <div>
            <p>#1130 Pasangers</p>
            <p>{trip.travelFrom} - {trip.travelTo}</p>
          </div>
        </div>
        <span className={classes.bottom_info}>Electronic ticket</span>
      </div>
      <div className={classes.right_block}>
        <p className={classes.sits_p}>{trip.avaiableSits} Avaiable sits</p>
        <h3 className={classes.price}>{trip.price}$</h3>
      </div>
    </div>
  )
}