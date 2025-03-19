import { Link } from 'react-router-dom';
import classes from '../styles/Header.module.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { useEffect, useRef, useState } from 'react';

export const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);

  const handleLogOut = () => {
    logout();
    setOpenModal(false);
  }

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        {!user && (
          <Link className={classes.links} to='/login'>LogIn</Link>
        )}
        {!user && (
          <Link className={classes.links} to='/signup'>SignUp</Link>
        )}
        {user && (
          <Link to='/publish' className={classes.right_block_link}>
            <img src='/plus.svg' alt='plusPicture' className={classes.plus} />
            <p className={classes.header_p}>Publish a trip</p>
          </Link>
        )}
        {user && (
          <h2>Hello {user.email.split('@')[0]}</h2>
        )}
        <div>
          <img 
            src='/userLogo.svg'
            alt='userPicture'
            className={classes.userLogo}
            onClick={() => setOpenModal(!openModal)}
         />
        </div>
        {openModal && (
          <div className={classes.modal} ref={modalRef}>
            <button onClick={handleLogOut} className={classes.modal_btn}>Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}