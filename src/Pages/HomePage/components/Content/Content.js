import styles from './Content.module.scss';
import Recipe from '../Recipe/Recipe';
import Loader from '../../../../Components/Loader/Loader';


function Content ({recipes, loading , toggleLikedRecipe, handleClickLoadMoreRecipes}){
  

    return (
        <div className="flex-fill container">
            <h1 className='mb-40 mt-100'>CooK Me ... Mes recettes préférées !!</h1>
           {loading ? 
           (<Loader/>)
            :
           ( <div className={`card p-20 ${styles.contentCard}`}>
            <div className={styles.grid}>
                {recipes.map((recipe) =>(
                     <Recipe key={recipe._id} recipe={recipe} toggleLikedRecipe={toggleLikedRecipe}/>
                ))}
            </div>
            </div>)
            }
            <div className='d-flex flex-row justify-content-center align-items-center mt-20 mb-20'>
                <button onClick={handleClickLoadMoreRecipes} className={styles.btnMoreLoad}>Charger plus de recettes</button>
            </div>

        </div>
    )
}

export default Content