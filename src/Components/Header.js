import styles from "./Header.module.scss";
import cookLogo from "../assets/images/COOK.png";



function Header (){
    return (
        <header className={styles.header}>
            <div className="d-flex flex-row align-items-center justify-content-space-between">
            <div className={`${styles.logoContainer}`}>
                <img src={cookLogo} alt="Cook Logo" />
            </div>
            <ul> 
                <button className="mr-10"><span className="material-symbols-outlined">menu</span></button>
                <button className="mr-10"><span className="material-symbols-outlined">shopping_basket</span></button>
                <button><span className="material-symbols-outlined">login</span></button>
            </ul>

            </div>
        </header>
    )
}

export default Header

