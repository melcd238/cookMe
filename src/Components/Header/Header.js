import styles from "./Header.module.scss";
import cookLogo from "../../assets/images/COOK.png";
import SearchBar from "../SearchBar/SearchBar";



function Header ({recipes , searchbar}){
    return (
        <header className={`${styles.header}`}>
            <div className="d-flex flex-row align-items-center justify-content-space-between flex-no-wrap">
            <div className={`${styles.logoContainer} mr-10`}>
                <img src={cookLogo} alt="Cook Logo" />
            </div>
            <SearchBar recipes={recipes} searchbar={searchbar}/>
            <ul className="d-flex flex-row flex-no-wrap"> 
                <button className="mr-5"><span className="material-symbols-outlined">menu</span></button>
                <button className="mr-5"><span className="material-symbols-outlined">bookmarks</span></button>
                <button><span className="material-symbols-outlined">login</span></button>
            </ul>

            </div>
        </header>
    )
}

export default Header

