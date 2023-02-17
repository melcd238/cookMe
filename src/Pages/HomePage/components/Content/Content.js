import styles from './Content.module.scss';
import Recipe from '../Recipe/Recipe';
import Loader from '../../../../Components/Loader/Loader';
import AddRecipe from '../../../AddRecipe/AddRecipe';
import { useState } from 'react';


function Content ({recipes, loading , toggleLikedRecipe, handleClickLoadMoreRecipes, deleteRecipe}){
     // si le btn est cliqué, on affiche le composant AddRecipe sinon on affcihe les recettes
     const [showAddRecipe, setShowAddRecipe] = useState(true);

        const handleForm = () => {
            setShowAddRecipe(!showAddRecipe);
        }

    return (
        <div className="flex-fill container">
            <h1 className='mb-40 mt-100'>CooK Me ... Mes recettes préférées !!</h1>

            <div className='d-flex flex-row justify-content-center align-items-center mt-20 mb-20 gap-10'>
                <button onClick={handleForm} className={styles.btnMoreLoad}>Ajouter une recette</button>
                <button className={styles.btnMoreLoad}>Mon menu de la semaine</button>
            </div>
            {!showAddRecipe && <AddRecipe/>}
           {loading ? 
           (<Loader/>)
            :
           
           ((<div className={`card p-20 ${styles.contentCard}`}>
            <div className={styles.grid}>
                {recipes.map((recipe) =>(
                     <Recipe key={recipe._id} 
                             recipe={recipe} 
                             toggleLikedRecipe={toggleLikedRecipe}
                             deleteRecipe={deleteRecipe}/>
                ))}
            </div>
            </div>))}
        
            <div className='d-flex flex-row justify-content-center align-items-center mt-20 mb-20'>
                <button onClick={handleClickLoadMoreRecipes} className={styles.btnMoreLoad}>Charger plus de recettes</button>
            </div>

        </div>
    )
}

export default Content