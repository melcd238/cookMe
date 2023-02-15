import styles from './SearchBar.module.scss';


function SearchBar ({searchbar}) {
    return (
        <div className={styles.searchContainer}>
        <input onInput={searchbar} type="text" placeholder="Je cherche une recette..." className={styles.searchInput} id="searchBarInput" />
        <button  className={styles.searchIcon}><span className="material-symbols-outlined">search</span></button>
        </div>
    );
}

export default SearchBar;