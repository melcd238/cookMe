import styles from './Content.module.scss';
import Recipe from '../Recipe/Recipe';
import Loader from '../../../../Components/Loader/Loader';
import { Link } from 'react-router-dom';



function Content ({recipes, loading , toggleLikedRecipe, handleClickLoadMoreRecipes, deleteRecipe}){
     

    return (
        <div className="flex-fill container">
            <h1 className='mb-40 mt-100'>CooK Me ... Mes recettes préférées !!</h1>

            <div className='d-flex flex-row justify-content-center align-items-center mt-20 mb-20 gap-10'>
            <Link to="/add-recipe">   <button  className={styles.btnMoreLoad}>Ajouter ma recette</button> </Link>
                <button className={styles.btnMoreLoad}>Mon menu de la semaine</button> 
            </div>
            
           {loading ? 
           (<Loader/>)
            :
           
           (( <>
           <div className={`card p-20 ${styles.contentCard}`}>
           {recipes.length === 0 && <p className='text-center'>Vous n'avez pas encore de recette</p>}
            <div className={styles.grid}>
                {recipes.map((recipe) =>(
                     <Recipe key={recipe._id} 
                             recipe={recipe} 
                             toggleLikedRecipe={toggleLikedRecipe}
                             deleteRecipe={deleteRecipe}/>
                ))}
            </div>
            </div>
            {recipes.length > 0 &&
            <div className='d-flex flex-row justify-content-center align-items-center mt-20 mb-20'>
                <button onClick={handleClickLoadMoreRecipes} className={styles.btnMoreLoad}>Charger plus de recettes</button>
            </div>} 
            </>))}

        </div>
    )
}

export default Content