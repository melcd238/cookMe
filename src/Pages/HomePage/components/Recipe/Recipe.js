import { useContext } from 'react';
import styles from './Recipe.module.scss';
import { ApiContext } from '../../../../Context/ApiContext';


function Recipe ({ recipe :{title, image, liked , _id}, toggleLikedRecipe, deleteRecipe}){
    const BASE_URL = useContext(ApiContext)

 async  function handleLike (){
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

    async function handleDeleteRecipe (){
        try {
            const response = await fetch(`${BASE_URL}/${_id}`, {
                method: "DELETE",
            })
            if(response.ok){
                deleteRecipe(_id)
            } else {
                console.log("oups error")
            }
        } catch (error) {
            console.log("oups error")
        }
    }


    return (
        <div className={styles.recipeContainer}>

            <div className={styles.imageContainer}>
                <img src={image} alt="recette"/>
                <div className={styles.deleteBtn}>
                    <span onClick={handleDeleteRecipe} className="material-symbols-outlined">delete</span>
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