import styles from './Recipe.module.scss';
import recette from '../assets/images/recette.jpg';

function Recipe (){
    return (
        <div className={styles.recipeContainer}>

            <div className={styles.imageContainer}>
                <img src={recette} alt="recette"/>
            </div>

            <div className={`${styles.recipeTitle} mt-20`}>
                <h3>Le titre de ma recette</h3>
            </div>
        </div>
    )
}

export default Recipe