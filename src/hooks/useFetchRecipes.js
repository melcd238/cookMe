import { useState, useEffect } from "react";
import { useContext } from "react";
import { ApiContext } from "../Context/ApiContext";
import authHeader from "../Services/authHeaders";

export default function useFetchRecipes() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const BASE_URL = useContext(ApiContext);


  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`${BASE_URL}/recipes/allrecipes`, { headers: authHeader() });
        if (response.ok) {
          const data = await response.json();
          setRecipes((x) => (Array.isArray(data) ? [...x, ...data] : [data]));
        } else {
          console.log("oups error");
        }
      } catch (error) {
        console.log("oups error");
      } finally {
        setLoading(false);
      }
    }
   
    fetchRecipes();
  }, [BASE_URL, page]);

  function updateRecipe(updatedRecipe) {
    setRecipes((recipes) => recipes.map((recipe) => (recipe._id === updatedRecipe._id ? updatedRecipe : recipe)));
  }

  function handleClickLoadMoreRecipes() {
    setPage(page + 1);
  }
  
  // A modifier pour que la recherche soit plus fluide et que l'on puisse rechercher par catégorie et par ingrédient en utilisant un useState pour filtrer les recettes
  function handleFilter(val) { 
    const filtered = recipes.filter((recipe) => {
      return recipe.title.toLowerCase().startsWith(val.toLowerCase().trim());
    });
    setRecipes(filtered);
    if(val===""){
      // afficher de nouveau toutes les recettes si la valeur de l'input est vide pour le moment en faisant un refresh de la page a modifier plus tard
      window.location.reload();
    }
  }

  function deleteRecipe (id){
    // supprimer une recette
    console.log(id)
    const newrecipes = recipes.filter((recipe) => recipe._id !== id)
   setRecipes(newrecipes)
  }


  return { recipes, loading, updateRecipe, handleClickLoadMoreRecipes, handleFilter, deleteRecipe };
}
