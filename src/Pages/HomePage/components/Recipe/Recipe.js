import { useContext } from 'react';
import styles from './Recipe.module.scss';
import { ApiContext } from '../../../../Context/ApiContext';
import { Link } from 'react-router-dom';
import authHeader from '../../../../Services/authHeaders';


function Recipe ({ recipe :{title, imageUrl, liked , _id}, toggleLikedRecipe, deleteRecipe}){
    const BASE_URL = useContext(ApiContext)
   

 async  function handleLike (e){
        e.stopPropagation()
       try {
              const response = await fetch(`${BASE_URL}/${_id}`, {
                method: "PATCH",
                headers: {
                     "Content-Type": "application/json"
                },
                body: JSON.stringify({liked: !liked})
              })
              if(response.ok){
                const updatedRecipe = await response.json();
                toggleLikedRecipe(updatedRecipe)
              } else {
                console.log("oups error")
              }
        
       } catch (error) {
            console.log("oups error")
       }
    }

    async function handleDeleteRecipe (e, id){
        e.stopPropagation()
        try {
            const response = await fetch(`${BASE_URL}/recipes/delete/${id}`, {
                method: "DELETE",
               headers: authHeader() 
            })
            if(response.ok){
                deleteRecipe(id)
            } else {
                console.log("oups error")
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

  




    return (
        
        <div className={styles.recipeContainer}>

               <div className={styles.imageContainer}>
               <Link to={`/recipe/${_id}`}>   <img src={imageUrl} alt="recette"/></Link>
                <div className={styles.deleteBtn}>
                    <span onClick={(e)=>handleDeleteRecipe(e,_id)} className="material-symbols-outlined">delete</span>
                </div>
                <div className={styles.addBookMark}>
                <span className="material-symbols-outlined">bookmark_add</span>
                </div>
            </div>  

            <div className={`${styles.recipeTitle} mt-20 d-flex justify-content-space-between p-10`}>
                <h3>{title}</h3>
                <span onClick={handleLike} className={`material-symbols-outlined ${liked ? "text-red" : ""}`}>favorite</span>
            </div>
        </div>
      
       
    )
}


export default Recipe