import styles from './Loader.module.scss'

function Loader () {
    return(
        <div className={styles.loader}>  
           <span className="material-symbols-outlined">sync</span> 
        </div>
    )
}

export default Loader;