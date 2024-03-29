import { useContext, useState } from 'react';
import styles from './Recipe.module.scss';
import { ApiContext } from '../../../../Context/ApiContext';
import { Link } from 'react-router-dom';
import authHeader from '../../../../Services/authHeaders';
import useImage from '../../../../hooks/useImage';



function Recipe ({ recipe :{title, imageUrl, liked , _id, bookmarked }, toggleLikedRecipe, deleteRecipe, updateBookmarks}){
    const BASE_URL = useContext(ApiContext)
    const [isLiked, setIsLiked] = useState(liked);
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);
    const image = useImage(imageUrl);
 

 async  function handleLike (e){
        e.stopPropagation()
       try {
              const response = await fetch(`${BASE_URL}/recipes/updatelike/${_id}`, {
                method: "PATCH",
                headers: {
                    ...authHeader(),
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({liked: !isLiked})
              })
              if(response.ok){
                const updatedRecipe = await response.json();
                console.log(updatedRecipe)
                setIsLiked(!isLiked)
                toggleLikedRecipe(isLiked)
              } else {
                console.log("oups error")
              }
        
       } catch (error) {
            console.log("oups error")
       }
    }
   
  async function handleAddBookMark (e){
        e.stopPropagation()
         try {
              const response = await fetch(`${BASE_URL}/recipes/updatebookmark/${_id}`, {
                method: "PATCH",
                headers: {
                    ...authHeader(),
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({bookmarked: !isBookmarked})
              })
              if(response.ok){
                const updatedRecipe = await response.json();
                console.log(updatedRecipe)
                setIsBookmarked(!isBookmarked)
                updateBookmarks(updatedRecipe)
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
               <Link to={`/recipe/${_id}`}>   <img src={image} alt="recette"/></Link>
                <div className={styles.deleteBtn}>
                    <span onClick={(e)=>handleDeleteRecipe(e,_id)} className="material-symbols-outlined">delete</span>
                </div>
                <div className={styles.addBookMark}>
                <span onClick={(e)=>handleAddBookMark(e,_id)} className={`material-symbols-outlined ${isBookmarked ? "text-red" : ""}`}>bookmark_add</span>
                </div>
            </div>  

            <div className={`${styles.recipeTitle} mt-20 d-flex justify-content-space-between p-10`}>
                <h3>{title}</h3>
                <span onClick={handleLike} className={`material-symbols-outlined ${isLiked ? "text-red" : ""}`}>favorite</span>
            </div>
        </div>
      
       
    )
}


export default Recipe