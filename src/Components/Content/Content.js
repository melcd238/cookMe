import styles from './Content.module.scss';
import Recipe from '../Recipe/Recipe';


function Content ({recipes}){
  

    return (
        <div className="flex-fill container">
            <h1 className='mb-40 mt-80'>Cuisinez Moi ... Des recettes pour tous !!</h1>

            <div className={`card p-20 ${styles.contentCard}`}>
            <div className={styles.grid}>
                {recipes.map((recipe, index) =>(
                     <Recipe key={recipe._id} title={recipe.title} image={recipe.image} />
                ))}
            </div>

            </div>
        </div>
    )
}

export default Content