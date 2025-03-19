import classes from '../styles/HomePage.module.css';
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <div className={classes.layout}>
        <h2 className={classes.home_title}>Checking train trips are now easy and fast!</h2>
        <div className={classes.home_title_2}>
          <h2 className={classes.title_2}>Click below to get all the scheduled trips right away!</h2>
        </div>
        <Link to='/trips' className={classes.btn_link}>Check all avaiable trips!</Link>
        <div className={classes.img_block}>
          <img src="/train.jpg" alt="train" className={classes.home_img}/>
        </div>
      </div>
    </div>
  )
}