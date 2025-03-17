import { Link } from 'react-router-dom';
import classes from '../styles/Header.module.css';

export const Header = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.left_block}>
        <Link to='/'>
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className={classes.logo_img}
          />
        </Link>
        <h1>BlaBlaTrain</h1>
      </div>
      <div className={classes.right_block}>
        <Link className={classes.right_block_link}>
          <img src='/plus.svg' alt='plusPicture' className={classes.plus} />
          <p className={classes.header_p}>Опублікувати поїздку</p>
        </Link>
        <h2>Hello Stepan!</h2>
        <div>
          <img src='/userLogo.svg' alt='userPicture' className={classes.userLogo} />
        </div>
      </div>
    </div>
  )
}