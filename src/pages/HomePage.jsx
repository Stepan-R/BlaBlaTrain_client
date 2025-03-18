import { Search } from "../components/Search"
import classes from '../styles/HomePage.module.css';
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <div className={classes.layout}>
        <h2 className={classes.home_title}>Check train trips easy and fast!</h2>
        <Search />
        <Link to='/trips' className={classes.btn_link}>Check all avaiable trips!</Link>
        <div className={classes.img_block}>
          <img src="/train.jpg" alt="train" className={classes.home_img}/>
        </div>
      </div>
    </div>
  )
}