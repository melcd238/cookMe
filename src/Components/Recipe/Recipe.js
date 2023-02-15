import styles from './Recipe.module.scss';
import { useState } from 'react';


function Recipe ({title, image}){
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    }

    return (
        <div className={styles.recipeContainer}>

            <div className={styles.imageContainer}>
                <img src={image} alt="recette"/>
            </div>

            <div className={`${styles.recipeTitle} mt-20 d-flex justify-content-space-between p-10`}>
                <h3>{title}</h3>
                <span onClick={handleLike} className={`material-symbols-outlined ${liked ? "text-red" : ""}`}>favorite</span>
            </div>
        </div>
    )
}

export default Recipe