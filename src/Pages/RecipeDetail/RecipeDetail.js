import styles from './RecipeDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useContext,useEffect, useState } from 'react';
import { ApiContext } from '../../Context/ApiContext';
import authHeader from '../../Services/authHeaders';
import { Link } from 'react-router-dom';


function RecipeDetail() {
    const { id } = useParams();
    const BASE_URL = useContext(ApiContext);
    const [recipe, setRecipe] = useState(null);

    useEffect(()=>{
        async function getRecipeDetail() {
            try {
                const response = await fetch(`${BASE_URL}/recipes/${id}`, { headers: authHeader() });
                if (response.ok) {
                    const data = await response.json();
                    setRecipe(data);
                } else {
                    console.log("oups error");
                }
    
            } catch (error) {
                console.log("oups error");
            }
        };
      getRecipeDetail(id);
           
    },[BASE_URL, id])


    console.log(recipe?.instructions )

    return (
        <div className={`${styles.recipeDetail} flex-fill container`}>
            <div className='card'>
                 <h1 className='mt-10'>{recipe?.title.toUpperCase()}</h1>
                 <Link to="/home"><span className={`material-symbols-outlined ${styles.arrowComeBack}`}>arrow_back</span> </Link>
                 <p className={styles.anecdote}>{recipe?.anecdote}</p>
                <div className={styles.contentrecipe}>
                    <div className={styles.img}>
                        <img src={recipe?.imageUrl} alt={recipe?.title} />
                    </div>
                    <div className={styles.description}>
                        <div className={styles.catAndTime}>
                          <p className={styles.time}><span className={`material-symbols-outlined ${styles.timeIcon}`}>schedule</span>{recipe?.timePreparation}</p>
                          <p className={styles.cat}><span className={`material-symbols-outlined ${styles.catIcon}`}>category</span>{recipe?.categorie}</p>
                        </div>
                        <div className={styles.ingredients}>
                            <p className={styles.ing}><span className={`material-symbols-outlined ${styles.ingIcon}`}>list</span> Ingrédients:</p>
                           <ul>
                                 {recipe?.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                           </ul>
                        </div>
                        <div className={styles.ustensils}>
                            <p className={styles.ust}><span className={`material-symbols-outlined ${styles.ustIcon}`}>restaurant_menu</span> Ustensiles:</p>
                            <ul>
                                {recipe?.ustensils.map((ustensil, index) => (
                                    <li key={index}>{ustensil}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.steps}>
                            <p className={styles.step}><span className={`material-symbols-outlined ${styles.stepIcon}`}>format_list_numbered</span>Instructions:</p>
                           <ul>
                                {recipe?.instructions.map((instruction) => (
                                    <li key={instruction._id}>
                                        <p className={styles.etape}>Etape: {instruction.etape.toUpperCase()} </p>
                                        <p className={styles.etapeContent}>{instruction.content}.</p>
                                    </li>
                                ))}
                            
                           </ul>
                        </div>
                    </div>    

                </div>
            </div>
        </div>
    )
}

export default RecipeDetail