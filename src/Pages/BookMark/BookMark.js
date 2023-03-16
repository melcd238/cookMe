import { useEffect, useState, useContext} from "react";
import { ApiContext } from '../../Context/ApiContext';
import authHeader from '../../Services/authHeaders';
import CardBookmark from '../../Components/CardBookmark/CardBookmark';
import { Link } from 'react-router-dom';
import styles from './BookMark.module.scss';









const BookMark = () => {
    const [ bookmarks, setBookmarks ] = useState([]);
    const BASE_URL = useContext(ApiContext);
   

    useEffect(() => {
        const getBookmarks = async () => {
            const response = await fetch(`${BASE_URL}/recipes/allbookmarkedrecipes`, { headers: authHeader() });
            const data = await response.json();
            setBookmarks(data);
            console.log(data)
        }
        getBookmarks();
    }, [BASE_URL]);




    return (
    
        <div className="flex-fill container">
         <div className="mt-100 d-flex flex-column justify-content-center align-items-center">
            <h1>BookMarks</h1>
            <Link to="/home"><span className={`material-symbols-outlined ${styles.arrowComeBack}`}>arrow_back</span> </Link>
            <p>Avec les bookmarks, vous pouvez facilement marquer les recettes que vous souhaitez préparer pour la semaine ou le
                 mois à venir. Plus besoin de vous creuser la tête chaque jour pour trouver l'inspiration culinaire : il vous suffit 
                 de consulter vos recettes bookmarkées pour avoir accès à une liste de plats délicieux et pré-approuvés.
            </p>
            <div className='card'>
            {bookmarks.length > 0 ? (
            bookmarks.map((recipe, index) => (
                <CardBookmark bookmark={recipe} key={index}/>
            ))
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h3>Vous n'avez pas encore de recettes bookmarkées.</h3>
              <p>Commencez à bookmark des recettes pour les retrouver ici !</p>
            </div>
          )}
                
            </div>
         </div>
    
        </div>
    
    );
    

}

export default BookMark;
