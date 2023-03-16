import styles from "./Header.module.scss";
import cookLogo from "../../assets/images/COOK.png";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";




function Header ({ searchbar, user}){
  
    
    function handleLogout() {
        localStorage.removeItem("user");
        window.location.href = "/";
    }

    return (
        <header className={`${styles.header}`}>
            <div className="d-flex flex-row align-items-center justify-content-space-between flex-no-wrap">
            <div className={`${styles.logoContainer} mr-10`}>
             <Link to={user ? "/home" : "/"} > <img src={cookLogo} alt="Cook Logo" /> </Link>
             </div>
            {user ? (
                <>
                <SearchBar  searchbar={searchbar}/>
            <ul className="d-flex flex-row flex-no-wrap"> 
                <button className="mr-5"><span className="material-symbols-outlined">menu</span></button>
               <Link to="/bookmarks"><button className="mr-5"><span className="material-symbols-outlined">bookmarks</span>
               </button></Link> 
               
                <button onClick={handleLogout} ><span className="material-symbols-outlined">logout</span></button>
            </ul> </> ) : null }

            </div> 
           
        </header>
    )
}

export default Header

