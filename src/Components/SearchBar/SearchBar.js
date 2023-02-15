import styles from './SearchBar.module.scss';
import { useState } from 'react';


function SearchBar ({searchbar}) {
   const [searchValue, setSearchValue] = useState('');

   const handleSearchValue = (e) => {
         setSearchValue(e.target.value);
         searchbar(e.target.value);
    }
    
    return (
        <div className={styles.searchContainer}>
        <input  onChange={handleSearchValue} value={searchValue} type="text" placeholder="Je cherche une recette..." className={styles.searchInput} id="searchBarInput" />
        <button  className={styles.searchIcon}><span className="material-symbols-outlined">search</span></button>
        </div>
    );
}

export default SearchBar;