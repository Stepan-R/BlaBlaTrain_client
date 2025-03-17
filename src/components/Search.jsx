import classes from '../styles/Search.module.css';

export const Search = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.left_block}>
        <input className={classes.search_input} value='lviv'/>
        <img className={classes.search_img} src='arrow.svg' alt='arrow' />
        <input className={classes.search_input} value='Kyiv'/>
        <input className={classes.search_input} type='date'/>
      </div>
      <div>
        <button>Find a trip</button>
      </div>
    </div>
  )
}