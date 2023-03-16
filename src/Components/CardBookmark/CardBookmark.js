import React from "react";
import { Link } from "react-router-dom";
import useImage from "../../hooks/useImage";
import styles from "./CardBookmark.module.scss";



const CardBookmark = ({ bookmark}) => { 
    const image = useImage(bookmark.imageUrl);      

    return (
        <Link to={`/recipe/${bookmark._id}`}>
          <div className={styles.cardBookmark}>
            <img src={image}  alt={bookmark.title}/>
            <div className={styles.littleCard}>
              <h3>{bookmark.title}</h3>
              <p>{bookmark.categorie}</p>
            </div>
          </div>
        </Link>
      );
    
}

export default CardBookmark;